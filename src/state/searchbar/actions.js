import {SEARCH,
        SHOW_SEARCHBAR,
        RESTORE_SEARCHBAR_DEFAULTS} from '../action-types';

export const showSearchbar = () => ({
  type: SHOW_SEARCHBAR,
});

export const search=(filter)=>({
  type:SEARCH,
  filter
})

export const  restoreDefaults = () =>({
    type: RESTORE_SEARCHBAR_DEFAULTS,
})
