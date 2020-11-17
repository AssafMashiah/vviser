import {
    LOAD_BUTTON_LABELS,
    RESTORE_BUTTON_DEFAULTS
} from '../action-types';

export const loadButtonLabels = (labels) => ({
    type: LOAD_BUTTON_LABELS,
    labels
});

export const restoreButtonDefaults = () => ({
    type: RESTORE_BUTTON_DEFAULTS
});

