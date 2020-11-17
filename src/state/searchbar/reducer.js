import {Map, List} from 'immutable';
import {
    SEARCH,
    SHOW_SEARCHBAR,
    RESTORE_SEARCHBAR_DEFAULTS
} from '../action-types';

const initialState = Map({
    showSearch: false,
    filter: '',
});

const toggleSearchbar = (state) => {
      return state.set('showSearch', !state.get('showSearch'));
};

const searchbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SEARCHBAR:
          return toggleSearchbar(state);
        case SEARCH:
          return state.set('filter', action.filter);
        case RESTORE_SEARCHBAR_DEFAULTS:
            return state.set('filter', '')
                        .set('showSearch', false);
        default:
            return state;
    }
};

export default searchbarReducer;
