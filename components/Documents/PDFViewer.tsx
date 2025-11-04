'use client';

import { useEffect, useRef, useState } from 'react';

interface PDFViewerProps {
    url: string;
    scale?: number;
    onLoadComplete?: (numPages: number) => void;
    showAllPages?: boolean; // Show all pages in vertical scroll (industry standard)
    onPageChange?: (pageNumber: number) => void; // Callback when page changes (for scroll position)
}

export default function PDFViewer({ url, scale = 1.5, onLoadComplete, showAllPages = false, onPageChange }: PDFViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const pagesContainerRef = useRef<HTMLDivElement>(null);
    const onLoadCompleteRef = useRef(onLoadComplete);
    const onPageChangeRef = useRef(onPageChange);
    const loadedUrlRef = useRef<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [pdfDoc, setPdfDoc] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [renderedPages, setRenderedPages] = useState<Map<number, boolean>>(new Map()); // Track which pages are rendered
    const pageCanvasRefs = useRef<Map<number, HTMLCanvasElement>>(new Map());
    const pageContainerRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    // Update refs when callbacks change (without triggering re-render)
    useEffect(() => {
        onLoadCompleteRef.current = onLoadComplete;
        onPageChangeRef.current = onPageChange;
    }, [onLoadComplete, onPageChange]);

    // Load PDF document - only when URL changes
    useEffect(() => {
        // Skip if we've already loaded this URL
        if (loadedUrlRef.current === url && pdfDoc) {
            return;
        }

        let isMounted = true;

        const loadPDF = async () => {
            if (!url) {
                setError('No PDF URL provided');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                
                // Dynamically import pdfjs-dist only on client side
                const pdfjsLib = await import('pdfjs-dist');
                
                // Set up PDF.js worker - Use unpkg CDN (reliable for Next.js)
                if (typeof window !== 'undefined') {
                    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
                }
                
                console.log('Loading PDF from URL:', url);
                
                // Convert blob URL to ArrayBuffer for better compatibility
                let pdfData: ArrayBuffer | string = url;
                
                if (url.startsWith('blob:')) {
                    try {
                        const response = await fetch(url);
                        pdfData = await response.arrayBuffer();
                    } catch (fetchError) {
                        console.warn('Failed to fetch blob as ArrayBuffer, using URL directly:', fetchError);
                        pdfData = url;
                    }
                }
                
                const loadingTask = pdfjsLib.getDocument({ 
                    data: pdfData,
                    disableAutoFetch: false,
                    disableStream: false
                });
                
                const pdf = await loadingTask.promise;

                if (!isMounted) return;

                console.log('PDF loaded successfully, pages:', pdf.numPages);

                loadedUrlRef.current = url;
                setPdfDoc(pdf);
                setNumPages(pdf.numPages);
                onLoadCompleteRef.current?.(pdf.numPages);
                setIsLoading(false);
            } catch (error: any) {
                console.error('Error loading PDF:', error);
                setError(error?.message || 'Failed to load PDF. Please try again.');
                setIsLoading(false);
            }
        };

        loadPDF();

        return () => {
            isMounted = false;
        };
    }, [url]); // Only depend on url, not onLoadComplete

    const hasRenderedInitialPageRef = useRef(false);

    // Render initial page when PDF and canvas are ready
    useEffect(() => {
        if (!pdfDoc || !canvasRef.current || isLoading || hasRenderedInitialPageRef.current) {
            return;
        }

        // Small delay to ensure canvas is fully mounted, then render first page
        const timer = setTimeout(() => {
            if (canvasRef.current && pdfDoc) {
                renderPage(pdfDoc, 1, true);
                hasRenderedInitialPageRef.current = true;
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [pdfDoc, isLoading]); // Only re-render when PDF loads or loading state changes

    // Reset render flag when URL changes
    useEffect(() => {
        hasRenderedInitialPageRef.current = false;
        pageCanvasRefs.current.clear();
        pageContainerRefs.current.clear();
        setRenderedPages(new Map());
    }, [url]);

    // Render all pages when showAllPages is true (industry standard: vertical scroll)
    useEffect(() => {
        if (!showAllPages || !pdfDoc || isLoading || numPages === 0) {
            return;
        }

        let isCancelled = false;

        const renderAllPages = async () => {
            const newRenderedPages = new Map<number, boolean>();
            
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                if (isCancelled) break;
                
                try {
                    const page = await pdfDoc.getPage(pageNum);
                    const viewport = page.getViewport({ scale });
                    
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    if (!context) continue;
                    
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    canvas.className = 'max-w-full h-auto border-0 shadow-lg bg-white';
                    canvas.style.display = 'block';
                    canvas.style.marginBottom = '0';
                    canvas.style.marginTop = '0';
                    
                    await page.render({
                        canvasContext: context,
                        viewport: viewport,
                        canvas: canvas
                    }).promise;
                    
                    if (isCancelled) break;
                    
                    // Append canvas to its container div
                    const container = pageContainerRefs.current.get(pageNum);
                    if (container) {
                        // Remove existing canvas if present and it's actually a child
                        const existingCanvas = container.querySelector('canvas');
                        if (existingCanvas) {
                            try {
                                if (existingCanvas.parentNode === container) {
                                    container.removeChild(existingCanvas);
                                }
                            } catch (e) {
                                // Canvas might have already been removed, ignore
                                console.warn(`Could not remove existing canvas for page ${pageNum}:`, e);
                            }
                        }
                        // Append new canvas
                        container.appendChild(canvas);
                    }
                    
                    pageCanvasRefs.current.set(pageNum, canvas);
                    newRenderedPages.set(pageNum, true);
                } catch (error) {
                    console.error(`Error rendering page ${pageNum}:`, error);
                }
            }
            
            if (!isCancelled) {
                setRenderedPages(newRenderedPages);
            }
        };

        // Small delay to ensure containers are mounted
        const timer = setTimeout(() => {
            renderAllPages();
        }, 100);

        return () => {
            isCancelled = true;
            clearTimeout(timer);
        };
    }, [showAllPages, pdfDoc, numPages, isLoading, scale]);

    // Track scroll position to determine current page (for signature placement)
    useEffect(() => {
        if (!showAllPages || !pagesContainerRef.current || numPages === 0) return;

        const container = pagesContainerRef.current;
        const pageElements = container.querySelectorAll('[data-page-number]');
        if (pageElements.length === 0) return;

        const handleScroll = () => {
            const containerTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            const viewportCenter = containerTop + containerHeight / 2;

            // Find which page is currently in the center of the viewport
            let currentVisiblePage = 1;
            pageElements.forEach((element) => {
                const pageElement = element as HTMLElement;
                const pageTop = pageElement.offsetTop;
                const pageHeight = pageElement.offsetHeight;
                const pageBottom = pageTop + pageHeight;
                const pageNum = parseInt(pageElement.getAttribute('data-page-number') || '1');

                if (viewportCenter >= pageTop && viewportCenter <= pageBottom) {
                    currentVisiblePage = pageNum;
                }
            });

            if (currentVisiblePage !== currentPage) {
                setCurrentPage(currentVisiblePage);
                onPageChangeRef.current?.(currentVisiblePage);
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [showAllPages, numPages, currentPage]);

    const renderPage = async (pdf: any, pageNum: number, updateCurrentPage: boolean = true) => {
        if (!canvasRef.current) {
            console.warn('Canvas ref not available, skipping render');
            return;
        }

        try {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale });

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (!context) {
                console.error('Could not get canvas context');
                setError('Failed to get canvas rendering context');
                return;
            }

            // Set canvas dimensions
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            console.log(`Rendering page ${pageNum}, canvas size: ${canvas.width}x${canvas.height}`);

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            const renderTask = page.render(renderContext);
            await renderTask.promise;
            
            console.log(`Page ${pageNum} rendered successfully`);
            if (updateCurrentPage) {
                setCurrentPage(pageNum);
            }
        } catch (error) {
            console.error('Error rendering page:', error);
            setError(`Failed to render page ${pageNum}: ${error}`);
        }
    };

    const goToPage = (pageNum: number) => {
        if (pageNum >= 1 && pageNum <= numPages && pdfDoc) {
            renderPage(pdfDoc, pageNum, true);
        }
    };

    const nextPage = () => {
        if (currentPage < numPages) {
            goToPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-full min-h-[600px]">
                <div className="text-center">
                    <p className="text-sm text-[#FC3400] mb-2">Error loading PDF</p>
                    <p className="text-xs text-[#727A90]">{error}</p>
                    <p className="text-xs text-[#727A90] mt-4">Try uploading the PDF again or use a different file.</p>
                </div>
            </div>
        );
    }

    // Multi-page vertical scroll view (industry standard)
    if (showAllPages && numPages > 0) {
        return (
            <div ref={containerRef} className="relative w-full flex flex-col items-center">
                {isLoading && (
                    <div className="flex items-center justify-center h-full min-h-[600px] w-full absolute inset-0 bg-white z-10">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#5542F6] mb-4"></div>
                            <p className="text-sm text-[#727A90]">Loading PDF...</p>
                        </div>
                    </div>
                )}
                <div 
                    ref={pagesContainerRef}
                    className="relative w-full flex flex-col items-center pb-4"
                    style={{ 
                        visibility: isLoading ? 'hidden' : 'visible'
                    }}
                >
                    {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => {
                        const isRendered = renderedPages.get(pageNum);
                        return (
                            <div 
                                key={pageNum} 
                                data-page-number={pageNum} 
                                ref={(el) => {
                                    if (el) {
                                        pageContainerRefs.current.set(pageNum, el);
                                    }
                                }}
                                className="relative mb-6 w-full flex flex-col items-center justify-start"
                                style={{ 
                                    minHeight: 'auto',
                                    position: 'relative',
                                    display: 'flex'
                                }}
                            >
                                {!isRendered && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-[#5542F6] mb-2"></div>
                                            <p className="text-xs text-[#727A90]">Loading page {pageNum}...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* Page indicator */}
                {numPages > 1 && (
                    <div className="mt-2 flex items-center justify-center">
                        <span className="text-xs text-[#727A90] bg-white px-3 py-1 rounded-full border border-[#E4E7EC]">
                            Page {currentPage} of {numPages}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    // Single page view with navigation (original behavior)
    return (
        <div ref={containerRef} className="relative w-full flex flex-col items-center">
            {isLoading && (
                <div className="flex items-center justify-center h-full min-h-[600px] w-full absolute inset-0 bg-white z-10">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#5542F6] mb-4"></div>
                        <p className="text-sm text-[#727A90]">Loading PDF...</p>
                    </div>
                </div>
            )}
            <div className="relative bg-white" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
                <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto border-0 shadow-lg bg-white"
                    style={{ 
                        display: 'block',
                        maxWidth: '100%',
                        height: 'auto'
                    }}
                />
            </div>

            {/* Page Navigation */}
            {numPages > 1 && (
                <div className="mt-4 flex items-center gap-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-[#E4E7EC] rounded-sm text-sm font-medium text-[#24282E] hover:bg-[#F7F8FA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-[#727A90]">
                        Page {currentPage} of {numPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === numPages}
                        className="px-4 py-2 bg-white border border-[#E4E7EC] rounded-sm text-sm font-medium text-[#24282E] hover:bg-[#F7F8FA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

