import {BROWSE_TO_PAGE,
        RESTORE_BROWSER_DEFAULTS} from '../action-types';

export const browseToPage = (url) => ({
  type: BROWSE_TO_PAGE,
    url
});

export const restoreBrowserDefaults=()=>({
  type:RESTORE_BROWSER_DEFAULTS,
})
