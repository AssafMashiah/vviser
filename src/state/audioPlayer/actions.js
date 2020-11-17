import {
    INIT_PLAYER,
    SET_PLAYBACK_POSITION,
    TOGGLE_PLAYER,
    RESTORE_PLAYER_DEFAULTS,
    GET_STATUS,
    HIDE_PLAYER
} from '../action-types';

export const initPlayer = (trackURL) =>({
    type: INIT_PLAYER,
    trackURL
})

export const setPlaybackPosition = (position) => ({
    type: SET_PLAYBACK_POSITION,
    position
});

export const togglePlayer=()=>({
    type:TOGGLE_PLAYER,
});

export const restorePlayerDefaults = ()=>({
    type:RESTORE_PLAYER_DEFAULTS,
});

export const getPlayerStatus = (arg, status) => ({
    type: GET_STATUS,
    arg,
    status
});
export const hidePlayer=()=>({
    type: HIDE_PLAYER,
});

