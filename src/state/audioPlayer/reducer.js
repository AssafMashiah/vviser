import {
    INIT_PLAYER,
    SET_PLAYBACK_POSITION,
    TOGGLE_PLAYER,
    RESTORE_PLAYER_DEFAULTS,
    GET_STATUS,
    HIDE_PLAYER
} from '../action-types';

import {fromJS} from 'immutable';


const initialState = fromJS({
    track: '',
    isLoading: false,
    error: '',
    paused: true,
    hidden: true,
    status: {},
    sliderPosition: 0,
});

const audioPlayerReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_PLAYER:
            return state.set('isLoading', true)
                .set('track', action.trackURL)
                .set('status', {
                    duration: 0,
                    progress: 0,
                });
        case TOGGLE_PLAYER:
            return state.set('hidden', !state.get('hidden'));
        case RESTORE_PLAYER_DEFAULTS:
            return initialState;
        case GET_STATUS:
            return state
                .set('status', action.status)
                .set('paused', action.status.status === 'PAUSED');
        case SET_PLAYBACK_POSITION:
            return state.set('sliderPosition', action.position);
        case HIDE_PLAYER:
            return state.set('hidden', true);
        default:
            return state;
    }
}

export default audioPlayerReducer;
