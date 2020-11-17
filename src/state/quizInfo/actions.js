import {
    LOAD_INFO,
    SET_QUIZ_COMPLETE,
    SET_QUIZINFO_INITIAL_STATE,
    LOAD_QUIZINFO_REQUEST,
} from '../action-types';

export const loadInfo = (info) => ({
  type: LOAD_INFO,
  info
});

export const loadInfoFromApi = (quizId) => ({
    type: LOAD_QUIZINFO_REQUEST,
    quizId
});

export const setQuizComplete = () => ({
  type: SET_QUIZ_COMPLETE,
});

export const restoreQuizInfoDefault = () => ({
    type: SET_QUIZINFO_INITIAL_STATE,
});

