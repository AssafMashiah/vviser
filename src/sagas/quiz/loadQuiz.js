import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {loadQuizApi} from '../../api';
import { LOAD_QUIZ_REQUEST, LOAD_QUIZ_ERROR, LOAD_QUIZ_SUCCESS } from '../../state/action-types';

function* runLoadQuiz(action) {
    try {
        const quiz = yield call(loadQuizApi, action.bookId, action.quizId);
        yield put({
            type: LOAD_QUIZ_SUCCESS,
            quiz
        });
    } catch (error) {
        yield put({
            type: LOAD_QUIZ_ERROR,
            error: error
        });
    }
}

export function* loadQuiz() {
    yield* takeEvery(LOAD_QUIZ_REQUEST, runLoadQuiz);
}
