import {Map, List} from 'immutable';
import _ from 'underscore';
import {
    LOAD_INFO,
    SET_QUIZ_COMPLETE,
    SET_QUIZINFO_INITIAL_STATE,
    LOAD_QUIZINFO_SUCCESS,
    LOAD_QUIZINFO_ERROR,
    LOAD_QUIZINFO_REQUEST
} from '../action-types';

const initialState = Map({
    questionNumber: 0,
    questionsCount: 0,
    answeredQuestionsCount: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
    halfRightAnswers: 0,
    passedQuestions: 0,
    isCompleted: false,
    isLoading: false,
    finalGrade:0,
});

// const right = _.filter(answers, (answer)=>{ return answer.lastGrade == 100});
// const wrong = _.filter(answers, (answer)=>{ return answer.lastGrade == 0});
// const half =  _.filter(answers, (answer)=>{ return answer.lastGrade < 100 && answer.lastGrade > 0});
//
// let result = {};
// result.questionsCount = answers.length;
// result.rightAnswers = right.length;
// result.wrongAnswers = wrong.length;
// result.halfRightAnswers = half.length;
// return result;

function _getResult(answers) {
    let result = {};
    result.answeredQuestionsCount = answers.length;
    result.rightAnswers = (answers.filter((answer) => {
            return answer.lastGrade == 100
        })).length;
    result.wrongAnswers = (answers.filter((answer) => {
            return answer.lastGrade == 0 && answer.lastAnswer !== null
        })).length;
    result.halfRightAnswers = (answers.filter((answer) => {
            return answer.lastGrade < 100 && answer.lastGrade > 0
        })).length;
    result.passedQuestions = (answers.filter((answer) => {
        return answer.lastGrade == 0 && answer.lastAnswer === null
    })).length;
    return result;
}

const quizInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUIZINFO_INITIAL_STATE:
            return initialState;
        case LOAD_QUIZINFO_REQUEST:
            return state.set('isLoading', true);
        case SET_QUIZ_COMPLETE:
            return state.set('isCompleted', true);
        case LOAD_QUIZINFO_SUCCESS: {
            const result = _getResult(action.quiz.quizState.answers);
            return state.set('isLoading', false)
                .set('finalGrade', action.quiz.quizState.totalGrade)
                .set('rightAnswers', result.rightAnswers)
                .set('wrongAnswers', result.wrongAnswers)
                .set('halfRightAnswers', result.halfRightAnswers)
                .set('answeredQuestionsCount', result.answeredQuestionsCount)
                .set('questionsCount', action.quiz.quizState.interactions.length)
                .set('passedQuestions', result.passedQuestions);
        }
        case LOAD_QUIZINFO_ERROR:
            return state.set('isLoading', false)
                .set('error', action.error);
        default:
            return state;
    }
};

export default quizInfoReducer;
