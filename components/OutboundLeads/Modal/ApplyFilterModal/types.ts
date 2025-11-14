export interface FilterSection {
    id: string;
    label: string;
    isExpanded: boolean;
}

export interface ApplyFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: () => void;
    onReset: () => void;
}

export interface DropdownOption {
    value: string;
    label: string;
}

export interface DropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: DropdownOption[];
    placeholder?: string;
    label?: string;
    className?: string;
}

export interface PillInputProps {
    values: string[];
    onAdd: (value: string) => void;
    onRemove: (index: number) => void;
    placeholder?: string;
    label?: string;
    includeButtonText?: string;
}

export interface FilterSectionProps {
    section: FilterSection;
    icon: React.ReactNode;
    onToggle: () => void;
    children?: React.ReactNode;
}

