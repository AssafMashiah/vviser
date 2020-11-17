import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {loadQuizInfoApi} from '../../api';
import { LOAD_QUIZINFO_REQUEST, LOAD_QUIZINFO_ERROR, LOAD_QUIZINFO_SUCCESS } from '../../state/action-types';

function* runLoadQuizInfo(action) {
    try {
        const quiz = yield call(loadQuizInfoApi, action.quizId);
        yield put({
            type: LOAD_QUIZINFO_SUCCESS,
            quiz
        });
    } catch (error) {
        yield put({
            type: LOAD_QUIZINFO_ERROR,
            error: error
        });
    }
}

export function* loadQuizInfo() {
    yield* takeEvery(LOAD_QUIZINFO_REQUEST, runLoadQuizInfo);
}
