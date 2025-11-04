import { Question } from '../Components/QuestionCard';

export interface SavedForm {
    id: string;
    title: string;
    description: string;
    type: string;
    questions: Question[];
    criteria?: any;
    createdAt: string;
}

/**
 * Save or update a form in localStorage
 */
export const saveForm = (formData: {
    formId?: string;
    title: string;
    questions: Question[];
    type: string;
    criteria?: any;
    isEditMode?: boolean;
}): SavedForm => {
    if (typeof window === 'undefined') {
        throw new Error('localStorage is not available');
    }

    const existingForms: SavedForm[] = JSON.parse(localStorage.getItem('forms') || '[]');

    if (formData.isEditMode && formData.formId) {
        // Update existing form
        const formIndex = existingForms.findIndex((f) => f.id === formData.formId);
        if (formIndex !== -1) {
            const existingForm = existingForms[formIndex];
            existingForms[formIndex] = {
                ...existingForm,
                title: formData.title || existingForm.title,
                questions: formData.questions,
                criteria: formData.criteria,
                type: formData.type,
                // Keep original createdAt
            };
            localStorage.setItem('forms', JSON.stringify(existingForms));
            window.dispatchEvent(new Event('formSaved'));
            return existingForms[formIndex];
        }
    }

    // Create new form
    const newForm: SavedForm = {
        id: `form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: formData.title || 'Untitled Form',
        description: 'Here is the inquiry form preview',
        type: formData.type,
        questions: formData.questions,
        criteria: formData.criteria,
        createdAt: new Date().toISOString(),
    };

    existingForms.push(newForm);
    localStorage.setItem('forms', JSON.stringify(existingForms));
    window.dispatchEvent(new Event('formSaved'));
    return newForm;
};

/**
 * Load a form by ID from localStorage
 */
export const loadForm = (formId: string): SavedForm | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    const forms: SavedForm[] = JSON.parse(localStorage.getItem('forms') || '[]');
    return forms.find((f) => f.id === formId) || null;
};

