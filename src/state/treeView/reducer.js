import {Map, List, fromJS} from 'immutable';
import {
    LOAD_ITEMS,
    LOAD_ITEMS_ERROR,
    LOAD_ITEMS_SUCCESS,
    RESTORE_TREE_VIEW_DEFAULTS
} from '../action-types';

import _ from 'underscore';
const treeData = require('../../jsons/treeData.json');

const initialState = fromJS({
    items: fromJS([]),
    collapsed: fromJS([]),
    isLoading: false,
});

function _mapToLocalModel(categories) {
    _.each(categories,(category)=>{
        let quizzes = [];
        _.each(category.quizzes, (quiz)=>{
            quizzes.push({
                id: quiz.id,
                title: quiz.title,
                type: 'quiz',
                bookId: category.id,
                bookTitle: category.title,
            })});
       treeData[3].data.push({
           id: category.id,
           title: category.title,
           type:'subject',
           data: quizzes
           })
       });
    return treeData;
    }

const treeViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ITEMS:
            return state.set('isLoading', true);
        case LOAD_ITEMS_SUCCESS:
            let items = _mapToLocalModel(action.categories);
            return state.set('items', items)
                        .set('collapsed', [])
                        .set('isLoading', false);
        case LOAD_ITEMS_ERROR:
            return state
                .set('error', action.error)
                .set('isLoading', false);
        case RESTORE_TREE_VIEW_DEFAULTS:
            return initialState;
        default:
            return state;
    }
};

export default treeViewReducer;
