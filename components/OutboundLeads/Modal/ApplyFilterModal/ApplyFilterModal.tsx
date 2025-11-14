'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ApplyFilterModalProps, FilterSection } from './types';
import { FilterIcon } from './components/FilterIcon';
import { FilterSection as FilterSectionComponent } from './components/FilterSection';
import { FilterGroup } from './components/FilterGroup';
import { NameFilter } from './fields/NameFilter';
import { JobInfoFilter } from './fields/JobInfoFilter';
import { LocationFilter } from './fields/LocationFilter';
import { SkillsFilter } from './fields/SkillsFilter';
import { EducationFilter } from './fields/EducationFilter';
import { LinkedInFilter } from './fields/LinkedInFilter';
import { PastCompanyFilter } from './fields/PastCompanyFilter';
import { BusinessNameFilter } from './fields/BusinessNameFilter';
import { HQLocationFilter } from './fields/HQLocationFilter';
import { IndustryFilter } from './fields/IndustryFilter';
import { HeadcountFilter } from './fields/HeadcountFilter';
import { RevenueFilter } from './fields/RevenueFilter';
import { YearFoundedFilter } from './fields/YearFoundedFilter';
import { SimpleInputFilter } from './fields/SimpleInputFilter';

export default function ApplyFilterModal({
    isOpen,
    onClose,
    onApply,
    onReset,
}: ApplyFilterModalProps) {
    const [personalFilters, setPersonalFilters] = useState<FilterSection[]>([
        { id: 'name', label: 'Name', isExpanded: true },
        { id: 'jobInfo', label: 'Job Information', isExpanded: false },
        { id: 'location', label: 'Location', isExpanded: false },
        { id: 'skills', label: 'Skills', isExpanded: false },
        { id: 'education', label: 'Education', isExpanded: false },
        { id: 'linkedin', label: 'LinkedIn URL', isExpanded: false },
        { id: 'pastCompany', label: 'Past Company', isExpanded: false },
    ]);

    const [companyFilters, setCompanyFilters] = useState<FilterSection[]>([
        { id: 'businessName', label: 'Business Name', isExpanded: false },
        { id: 'hqLocation', label: 'HQ Location', isExpanded: false },
        { id: 'industry', label: 'Industry', isExpanded: false },
        { id: 'headcount', label: 'Headcount', isExpanded: false },
        { id: 'revenue', label: 'Revenue', isExpanded: false },
        { id: 'yearFounded', label: 'Year Founded', isExpanded: false },
    ]);

    // Filter field states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitles, setJobTitles] = useState<string[]>(['UI Designer']);
    const [jobTitleLevel, setJobTitleLevel] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [locations, setLocations] = useState<string[]>([]);
    const [cityPostalCode, setCityPostalCode] = useState('');
    const [radius, setRadius] = useState('');
    const [skills, setSkills] = useState<string[]>(['UI Designer']);
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [pastCompany, setPastCompany] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [hqLocations, setHqLocations] = useState<string[]>([]);
    const [hqCityPostalCode, setHqCityPostalCode] = useState('');
    const [hqRadius, setHqRadius] = useState('');
    const [industry, setIndustry] = useState('');
    const [industryClassification, setIndustryClassification] = useState('');
    const [niasCode, setNiasCode] = useState('');
    const [headcount, setHeadcount] = useState('');
    const [revenue, setRevenue] = useState('');
    const [yearFounded, setYearFounded] = useState('');
    const [simpleFilterValues, setSimpleFilterValues] = useState<{ [key: string]: string }>({});

    const toggleSection = (sectionId: string, isPersonal: boolean) => {
        if (isPersonal) {
            setPersonalFilters(prev =>
                prev.map(section =>
                    section.id === sectionId
                        ? { ...section, isExpanded: !section.isExpanded }
                        : section
                )
            );
        } else {
            setCompanyFilters(prev =>
                prev.map(section =>
                    section.id === sectionId
                        ? { ...section, isExpanded: !section.isExpanded }
                        : section
                )
            );
        }
    };

    const renderFilterContent = (sectionId: string, isPersonal: boolean) => {
        switch (sectionId) {
            case 'name':
                return (
                    <NameFilter
                        firstName={firstName}
                        lastName={lastName}
                        onFirstNameChange={setFirstName}
                        onLastNameChange={setLastName}
                    />
                );
            case 'jobInfo':
                return (
                    <JobInfoFilter
                        jobTitles={jobTitles}
                        onJobTitleAdd={(value) => setJobTitles([...jobTitles, value])}
                        onJobTitleRemove={(index) => setJobTitles(jobTitles.filter((_, i) => i !== index))}
                        jobTitleLevel={jobTitleLevel}
                        onJobTitleLevelChange={setJobTitleLevel}
                        jobRole={jobRole}
                        onJobRoleChange={setJobRole}
                    />
                );
            case 'location':
                return (
                    <LocationFilter
                        locations={locations}
                        onLocationAdd={(value) => setLocations([...locations, value])}
                        onLocationRemove={(index) => setLocations(locations.filter((_, i) => i !== index))}
                        cityPostalCode={cityPostalCode}
                        onCityPostalCodeChange={setCityPostalCode}
                        radius={radius}
                        onRadiusChange={setRadius}
                    />
                );
            case 'skills':
                return (
                    <SkillsFilter
                        skills={skills}
                        onSkillAdd={(value) => setSkills([...skills, value])}
                        onSkillRemove={(index) => setSkills(skills.filter((_, i) => i !== index))}
                    />
                );
            case 'education':
                return (
                    <EducationFilter
                        school={school}
                        onSchoolChange={setSchool}
                        major={major}
                        onMajorChange={setMajor}
                    />
                );
            case 'linkedin':
                return (
                    <LinkedInFilter
                        url={linkedInUrl}
                        onUrlChange={setLinkedInUrl}
                    />
                );
            case 'pastCompany':
                return (
                    <PastCompanyFilter
                        company={pastCompany}
                        onCompanyChange={setPastCompany}
                    />
                );
            case 'businessName':
                return (
                    <BusinessNameFilter
                        company={businessName}
                        onCompanyChange={setBusinessName}
                    />
                );
            case 'hqLocation':
                return (
                    <HQLocationFilter
                        locations={hqLocations}
                        onLocationAdd={(value) => setHqLocations([...hqLocations, value])}
                        onLocationRemove={(index) => setHqLocations(hqLocations.filter((_, i) => i !== index))}
                        cityPostalCode={hqCityPostalCode}
                        onCityPostalCodeChange={setHqCityPostalCode}
                        radius={hqRadius}
                        onRadiusChange={setHqRadius}
                    />
                );
            case 'industry':
                return (
                    <IndustryFilter
                        industry={industry}
                        onIndustryChange={setIndustry}
                        industryClassification={industryClassification}
                        onIndustryClassificationChange={setIndustryClassification}
                        niasCode={niasCode}
                        onNiasCodeChange={setNiasCode}
                    />
                );
            case 'headcount':
                return (
                    <HeadcountFilter
                        headcount={headcount}
                        onHeadcountChange={setHeadcount}
                    />
                );
            case 'revenue':
                return (
                    <RevenueFilter
                        revenue={revenue}
                        onRevenueChange={setRevenue}
                    />
                );
            case 'yearFounded':
                return (
                    <YearFoundedFilter
                        yearFounded={yearFounded}
                        onYearFoundedChange={setYearFounded}
                    />
                );
            default:
                return (
                    <SimpleInputFilter
                        value={simpleFilterValues[sectionId] || ''}
                        onChange={(value) => setSimpleFilterValues({ ...simpleFilterValues, [sectionId]: value })}
                        placeholder={`Enter ${sectionId.toLowerCase().replace(/([A-Z])/g, ' $1').trim()}`}
                    />
                );
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/25 backdrop-blur-sm cursor-default z-60"
                    onClick={onClose}
                />
            )}

            {/* Side Panel */}
            <div className={`fixed inset-0 z-70 pointer-events-none`}>
                <div className={`absolute top-0 right-0 h-full transition-transform duration-200 ${isOpen ? 'translate-x-0' : 'translate-x-full'} pointer-events-auto`}>
                    <div className="h-full w-full sm:w-[480px] p-3 sm:p-4 flex">
                        <div className="h-full w-full bg-white rounded-md border border-[#E4E7EC] shadow-[0_10px_30px_rgba(85,66,246,0.08)] flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 pt-5 pb-4">
                                <div>
                                    <h2 className="text-[24px] font-bold text-[#24282E] mb-1">Filters</h2>
                                    <p className="text-[15px] text-[#727A90]">Here are the filters to apply</p>
                                </div>
                            </div>
                            <div className="h-px bg-[#EAECEF] mb-4"></div>

                            {/* Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto px-5 custom-scroll">
                                {/* Personal Filters */}
                                <FilterGroup title="Personal Filters">
                                    {personalFilters.map((section) => (
                                        <FilterSectionComponent
                                            key={section.id}
                                            section={section}
                                            icon={<FilterIcon sectionId={section.id} />}
                                            onToggle={() => toggleSection(section.id, true)}
                                        >
                                            {renderFilterContent(section.id, true)}
                                        </FilterSectionComponent>
                                    ))}
                                </FilterGroup>

                                {/* Company Filters */}
                                <FilterGroup title="Company Filters">
                                    {companyFilters.map((section) => (
                                        <FilterSectionComponent
                                            key={section.id}
                                            section={section}
                                            icon={<FilterIcon sectionId={section.id} />}
                                            onToggle={() => toggleSection(section.id, false)}
                                        >
                                            {renderFilterContent(section.id, false)}
                                        </FilterSectionComponent>
                                    ))}
                                </FilterGroup>
                            </div>

                            <div className="mt-6 h-px bg-[#EAECEF]"></div>

                            {/* Footer - Action Buttons */}
                            <div className="mt-auto w-full p-5 flex items-center justify-end gap-3">
                                <button
                                    onClick={onReset}
                                    className="px-2 py-1 bg-[#F7F8FA] border text-sm border-[#E4E7EC] text-[#24282E] font-medium rounded-sm hover:bg-[#EBEBEB] transition-colors"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={onApply}
                                    className="px-6 py-[0.3rem] bg-[#5542F6] text-white text-sm font-medium rounded-sm hover:bg-[#4535D6] transition-colors"
                                >
                                    Apply filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}

