import {takeEvery} from 'redux-saga';
import {put, call} from 'redux-saga/effects';
import {answerInteractionApi} from '../../api';
import {
    CHECK_INTERACTION_REQUEST,
    CHECK_INTERACTION_ERROR,
    CHECK_INTERACTION_SUCCESS,
} from '../../state/action-types';

function* runAnswerInteraction(action) {
    try {
        const statusAnswer = yield call(
            answerInteractionApi,
            action.model.quizStateId,
            action.index,
            action.model.interactionType,
            action.model.answer,
        );
        yield put({
            type: CHECK_INTERACTION_SUCCESS,
            index: action.index,
            statusAnswer
        });
    } catch (error) {
        yield put({
            type: CHECK_INTERACTION_ERROR,
            index: action.index,
            error: error
        });
    }
}

export function* answerInteraction() {
    yield* takeEvery(CHECK_INTERACTION_REQUEST, runAnswerInteraction);
}
