import {Map, List} from 'immutable';
import {
    BROWSE_TO_PAGE,
    RESTORE_BROWSER_DEFAULTS
} from '../action-types';

const initialState = Map({
    url: '',
});

const webBrowserReducer = (state = initialState, action) => {
    switch (action.type) {
        case BROWSE_TO_PAGE:
            return state.set('url', action.url);
        case RESTORE_BROWSER_DEFAULTS:
                return initialState;
        default:
            return state;
    }
};

export default webBrowserReducer;
