import {
    LOAD_QUIZ_SUCCESS, //test
    SET_QUIZ_INITIAL_STATE,
    LOAD_QUIZ_REQUEST,
    SET_CURRENT_INTERACTION,
    SHOW_FINAL_SCREEN,
    BIND_QUIZ_AND_BOOK_NAME,
    START_CHANGING_ROUTE_OF_INTERACTION,
    STOP_CHANGING_ROUTE_OF_INTERACTION,
} from '../action-types';

export const loadQuiz = (bookId, quizId) => ({
    type: LOAD_QUIZ_REQUEST,
    bookId,
    quizId
});

//test
export const loadLocalQuiz = (quiz) => ({
    type: LOAD_QUIZ_SUCCESS,
    quiz
});

export const restoreDefaultQuiz = () => ({
    type: SET_QUIZ_INITIAL_STATE
});

export const setQuestion = (currentInteraction) => ({
    type: SET_CURRENT_INTERACTION,
    currentInteraction
});

export const showFinalScreen = () => ({
    type: SHOW_FINAL_SCREEN,
});

export const startChangingRoute = () => ({
    type: START_CHANGING_ROUTE_OF_INTERACTION,
});

export const stopChangingRoute = () => ({
    type: STOP_CHANGING_ROUTE_OF_INTERACTION,
});

export const bindQuizAndBookName = (quizName, bookName) =>({
    type:BIND_QUIZ_AND_BOOK_NAME,
    quizName,
    bookName,
})
