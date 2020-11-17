import {
    LOAD_ITEMS,
    RESTORE_TREE_VIEW_DEFAULTS,
} from '../action-types';

export const loadItems = () => ({
    type: LOAD_ITEMS,
});

export const restoreTreeViewDefaults = () => ({
    type: RESTORE_TREE_VIEW_DEFAULTS,
})

