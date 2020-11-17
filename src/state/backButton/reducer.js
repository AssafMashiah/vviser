import {
    LOAD_BUTTON_LABELS,
    RESTORE_BUTTON_DEFAULTS
} from '../action-types';


const initialState = {
    quiz:'',
    questionNumber:0,
    subject:''
}

const backButtonReducer =  (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BUTTON_LABELS:
            return state.set('quiz', action.quiz)
                        .set('subject', action.subject)
                        .set('questionNumber', action.questionNumber);
        case RESTORE_BUTTON_DEFAULTS:
            return initialState;
        default:
            return state;
    }
}

export default backButtonReducer;
