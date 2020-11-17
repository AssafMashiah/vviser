import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {loadCategoriesApi, loginApi} from '../../api';
import { LOAD_ITEMS, LOAD_ITEMS_ERROR, LOAD_ITEMS_SUCCESS } from '../../state/action-types';

function* runLoadCategories(action) {
    try {
        yield call(loginApi);
        const categories = yield call(loadCategoriesApi, action.id);
        yield put({
            type: LOAD_ITEMS_SUCCESS,
            categories
        });
    } catch (error) {
        yield put({
            type: LOAD_ITEMS_ERROR,
            error: error
        });
    }
}

export function* loadCategories() {
    yield* takeEvery(LOAD_ITEMS, runLoadCategories);
}
