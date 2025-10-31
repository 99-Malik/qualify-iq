'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function ApprovedVsRejectedChart() {
    const [hoveredMonth, setHoveredMonth] = useState<number | null>(5); // Default to June (index 5)
    const [animatedTooltipPos, setAnimatedTooltipPos] = useState<{ x: number; y: number } | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const currentPosRef = useRef<{ x: number; y: number } | null>(null);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Data points for each month: [approved, rejected]
    const dataPoints = [
        [100, 150], // Jan
        [120, 145], // Feb
        [180, 140], // Mar
        [250, 155], // Apr
        [900, 200], // May
        [290, 180], // Jun
        [150, 120], // Jul
        [100, 110], // Aug
        [100, 100], // Sep
        [220, 120], // Oct
        [240, 130], // Nov
        [200, 150], // Dec
    ];

    // Calculate max value from all data points dynamically
    const maxDataValue = Math.max(
        ...dataPoints.flat(),
        0 // Ensure at least 0
    );
    
    // Round up to nearest nice number for Y-axis
    const roundToNiceNumber = (num: number): number => {
        const magnitude = Math.pow(10, Math.floor(Math.log10(num)));
        const normalized = num / magnitude;
        let nice;
        if (normalized <= 1) nice = 1;
        else if (normalized <= 2) nice = 2;
        else if (normalized <= 5) nice = 5;
        else nice = 10;
        return nice * magnitude;
    };
    const maxYAxisValue = Math.ceil(maxDataValue * 1.1); // Add 10% padding
    const niceMax = roundToNiceNumber(maxYAxisValue);

    const scaleY = (value: number) => {
        // Scale value (0-niceMax) to y position (180-10)
        return 180 - (value / niceMax) * 170;
    };

    // Generate Y-axis labels dynamically
    const generateYAxisLabels = () => {
        const labels: number[] = [];
        const steps = niceMax <= 100 ? 20 : niceMax <= 500 ? 100 : niceMax <= 1000 ? 200 : 500;
        for (let i = 0; i <= niceMax; i += steps) {
            labels.push(i);
        }
        // Ensure max is included
        if (labels[labels.length - 1] !== niceMax) {
            labels.push(niceMax);
        }
        return labels.reverse(); // Reverse to go from top to bottom
    };
    const yAxisLabels = generateYAxisLabels();

    const getMonthX = (index: number) => {
        // Full width chart: from Y-axis (35) to edge (800)
        // 12 months distributed evenly, Jan centers at Y-axis (aligns with "0")
        const chartStart = 35;
        const chartWidth = 800 - chartStart;
        const monthSpacing = chartWidth / 12;
        // Jan (index 0) centers at Y-axis, then space evenly
        return chartStart + index * monthSpacing;
    };

    const handleMouseEnter = (index: number) => {
        setHoveredMonth(index);
    };

    const handleMouseLeave = () => {
        setHoveredMonth(null);
    };

    const currentData = hoveredMonth !== null ? dataPoints[hoveredMonth] : [290, 180];
    const currentMonth = hoveredMonth !== null ? months[hoveredMonth] : 'Jun';
    const currentMonthX = hoveredMonth !== null ? getMonthX(hoveredMonth) : getMonthX(5); // Default to June
    const approvedY = scaleY(currentData[0]);
    const rejectedY = scaleY(currentData[1]);

    // Smooth tooltip position animation
    useEffect(() => {
        if (hoveredMonth === null) {
            setAnimatedTooltipPos(null);
            currentPosRef.current = null;
            return;
        }

        // Cancel any ongoing animation
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        const tooltipWidth = 115;
        const tooltipHeight = 72;
        // Center tooltip on the blue highlight bar, shifted slightly to the right
        const targetX = currentMonthX + 8;
        // Position tooltip directly above blue highlight area with no gap
        // Calculate blue area top position (slightly above max data point)
        const maxValue = Math.max(currentData[0], currentData[1]);
        const maxY = scaleY(maxValue);
        const blueAreaTop = maxY - 8; // Blue area starts 8px above max point
        // Tooltip bottom should align with blue area top
        const targetY = blueAreaTop - tooltipHeight;

        // Get start position from ref or use target
        const startPos = currentPosRef.current || { x: targetX, y: targetY };
        const startTime = Date.now();
        const duration = 200; // 200ms animation

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const currentX = startPos.x + (targetX - startPos.x) * easeOut;
            const currentY = startPos.y + (targetY - startPos.y) * easeOut;
            
            const newPos = { x: currentX, y: currentY };
            currentPosRef.current = newPos;
            setAnimatedTooltipPos(newPos);
            
            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                const finalPos = { x: targetX, y: targetY };
                currentPosRef.current = finalPos;
                setAnimatedTooltipPos(finalPos);
            }
        };

        // Start animation
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [hoveredMonth, currentMonthX, approvedY, rejectedY]);

    // Generate polyline points
    const approvedPoints = dataPoints.map((dp, i) => `${getMonthX(i)},${scaleY(dp[0])}`).join(' ');
    const rejectedPoints = dataPoints.map((dp, i) => `${getMonthX(i)},${scaleY(dp[1])}`).join(' ');

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-[#E4E7EC] mt-6">
            {/* Title + Legend */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#24282E]">Approved vs Rejected leads</h3>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#14B13B]"></div>
                        <span className="text-sm text-[#727A90]">Approved</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FC3400]"></div>
                        <span className="text-sm text-[#727A90]">Rejected</span>
                    </div>
                </div>
            </div>

            <div className="relative h-80 sm:h-80 lg:h-80 pt-8">
                {/* Chart container */}
                <svg 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 800 200" 
                    preserveAspectRatio="none" 
                    className="overflow-visible"
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Horizontal grid lines - start from Y-axis, not crossing it, dynamically generated */}
                    {yAxisLabels.map((label, i) => {
                        const yPos = scaleY(label);
                        return (
                            <g key={i}>
                                <line x1="35" y1={yPos} x2="800" y2={yPos} stroke="#EAECEF" strokeWidth="1" strokeDasharray="4 4" />
                            </g>
                        );
                    })}
                    
                    {/* Axes - dotted like grid lines, aligned with Jan and 0 */}
                    {/* Y-axis line removed per user request */}
                    <line x1="35" y1="180" x2="800" y2="180" stroke="#EAECEF" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Y-axis labels - dynamically generated, 0 aligned vertically with other labels */}
                    {yAxisLabels.map((label, i) => {
                        const yPos = scaleY(label);
                        // Adjust y position for text baseline (add ~5px offset for alignment)
                        const textY = label === 0 ? 185 : yPos + 5;
                        return (
                            <text key={i} x="28" y={textY} fontSize="10" fill="#727A90" textAnchor="end">
                                {label}
                            </text>
                        );
                    })}

                    {/* Month highlight - follows hover with smooth transition, extends from bottom up to max data point */}
                    {hoveredMonth !== null && (() => {
                        const monthSpacing = (800 - 35) / 12;
                        // Get max value for this month (between approved and rejected)
                        const maxValue = Math.max(currentData[0], currentData[1]);
                        // Calculate y position of max value
                        const maxY = scaleY(maxValue);
                        // Start slightly above blue dot, extend down to bottom (y=180)
                        const topY = maxY - 8; // 8px above max point for blue dot clearance
                        const highlightHeight = 180 - topY;
                        return (
                            <rect 
                                x={currentMonthX - monthSpacing / 2} 
                                y={topY} 
                                width={monthSpacing} 
                                height={highlightHeight} 
                                fill="#5542F6" 
                                opacity="0.08"
                                style={{
                                    transition: 'opacity 0.15s ease-out',
                                }}
                            />
                        );
                    })()}

                    {/* Approved line (green) */}
                    <polyline
                        points={approvedPoints}
                        fill="none"
                        stroke="#14B13B"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Rejected line (red) */}
                    <polyline
                        points={rejectedPoints}
                        fill="none"
                        stroke="#FC3400"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Interactive month areas */}
                    {months.map((month, i) => {
                        const monthSpacing = (800 - 35) / 12;
                        return (
                            <rect
                                key={month}
                                x={getMonthX(i) - monthSpacing / 2}
                                y="10"
                                width={monthSpacing}
                                height="170"
                                fill="transparent"
                                onMouseEnter={() => handleMouseEnter(i)}
                                style={{ cursor: 'pointer' }}
                            />
                        );
                    })}

                    {/* Focus dots - follow hover */}
                    {hoveredMonth !== null && (
                        <>
                            {/* Blue dot on approved line - blue filled with white border, small and compact */}
                            <circle cx={currentMonthX} cy={approvedY} r="4" fill="#5542F6" stroke="#FFFFFF" strokeWidth="2" />
                            {/* Red dot on rejected line */}
                            <circle cx={currentMonthX} cy={rejectedY} r="4" fill="#FC3400" stroke="#FFFFFF" strokeWidth="2" />
                        </>
                    )}

                    {/* Tooltip - follows hover - compact, narrow, tall, and elegant with smooth transitions */}
                    <defs>
                        <style>{`
                            @keyframes tooltipFadeIn {
                                from {
                                    opacity: 0;
                                }
                                to {
                                    opacity: 0.95;
                                }
                            }
                            .tooltip-enter {
                                animation: tooltipFadeIn 0.2s ease-out;
                            }
                        `}</style>
                    </defs>
                    {hoveredMonth !== null && animatedTooltipPos && (() => {
                        const tooltipWidth = 100;
                        const tooltipHeight = 70;
                        return (
                            <g 
                                transform={`translate(${animatedTooltipPos.x}, ${animatedTooltipPos.y})`}
                                style={{
                                    transition: 'opacity 0.15s ease-out',
                                }}
                            >
                                <rect 
                                    x="-57.5" 
                                    y="0" 
                                    width={tooltipWidth} 
                                    height={tooltipHeight} 
                                    rx="6" 
                                    fill="#24282E" 
                                    opacity="0.95"
                                    className="tooltip-enter"
                                />
                                {/* Month/Year header - left aligned */}
                                <text 
                                    x="-48" 
                                    y="17" 
                                    fontSize="11" 
                                    fill="#B6B4BA" 
                                    textAnchor="start" 
                                    fontWeight="400"
                                >
                                    {currentMonth}, 2021
                                </text>
                                {/* Approved row - left aligned */}
                                <g transform="translate(-48, 32)">
                                    <circle cx="4" cy="4" r="4" fill="#14B13B" />
                                    <text x="12" y="7" fontSize="10" fill="#FFFFFF">Approved: {currentData[0]}</text>
                                </g>
                                {/* Rejected row - left aligned */}
                                <g transform="translate(-48, 48)">
                                    <circle cx="4" cy="4" r="4" fill="#FC3400" />
                                    <text x="12" y="7" fontSize="10" fill="#FFFFFF">Rejected: {currentData[1]}</text>
                                </g>
                            </g>
                        );
                    })()}

                    {/* X-axis labels */}
                    {months.map((month, i) => {
                        // Shift Jan slightly to the right, keep others centered
                        const xPos = i === 0 ? getMonthX(i) + 18 : getMonthX(i);
                        return (
                            <text 
                                key={month} 
                                x={xPos} 
                                y="195" 
                                fontSize="10" 
                                fill="#727A90" 
                                textAnchor="middle"
                            >
                                {month}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
