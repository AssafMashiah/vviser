import {List, fromJS} from 'immutable';
import {
    // LOAD_QUIZ,
    SET_QUIZ_INITIAL_STATE,
    LOAD_QUIZ_ERROR,
    LOAD_QUIZ_SUCCESS,
    SET_CURRENT_INTERACTION,
    SHOW_FINAL_SCREEN,
    BIND_QUIZ_AND_BOOK_NAME,
    START_CHANGING_ROUTE_OF_INTERACTION,
    STOP_CHANGING_ROUTE_OF_INTERACTION,
} from '../action-types';
import _ from 'underscore';

import interaction, {
    INITIAL_STATE as INTERACTION_INITIAL_STATE,
    INITIAL_STATE_ANSWER,
    INITIAL_STATE_ATTACHMENT,
} from '../interaction/reducer';

const initialState = fromJS({
    id: "",
    quizStateId: "",
    index: null,
    isLoading: true,
    routeChanging: false,
    showFinalScreen: false,
    name: "ipsum lorom test",
    interactions: fromJS([INTERACTION_INITIAL_STATE]),
    currentInteraction: 0,
    error: null,
});

const mapChoices = (choices, answer) => {
    debugger
    return fromJS(_.map(choices, (choice, index) => {
        let setClear = true;
        if (_.isArray(answer.lastAnswer)) {
            setClear = !_.contains(answer.lastAnswer, index)
        }
        if (_.isNumber(answer.lastAnswer)) {
            setClear = answer.lastAnswer != index;
        }

        if (setClear) {
            return {
                label: choice,
                isSelected: false,
                isCorrect: false,
                isHalfCorrect: false,
                isWrong: false,
            }
        } else {
            return {
                label: choice,
                isSelected: true,
                isCorrect: answer.lastGrade === 100,
                isHalfCorrect: answer.lastGrade && answer.lastGrade < 100 && answer.trials === answer.maxTrials,
                isWrong: answer.trials === answer.maxTrials && !answer.lastGrade,
            }
        }
    }))
};

const setAnswer = (answer) => {
    return INITIAL_STATE_ANSWER
        .set('trials', answer.trials)
        .set('maxTrials', answer.maxTrials)
        .set('lastAnswer', answer.lastAnswer)
        .set('lastGrade', answer.lastGrade);
};

const mapAttachments = (attachments) => {
    let attachmentsObject = {};

    _.each(attachments, (attachment) => {
        if (attachment.attachmentType) {
            attachmentsObject[attachment.attachmentType] = attachment.url;
        }
    });

    return fromJS(attachmentsObject);
};

const setAttachmentStatus = (attachments) => {
    const setType = (attachments) => {
        let type = null;
        if (attachments.length) {
            type = _.first(attachments).attachmentType;
        }

        return type;
    };

    return INITIAL_STATE_ATTACHMENT
        .set('isActive', Boolean(attachments.length))
        .set('type', setType(attachments));
};

const isRelatedInteraction = (relatedInteractions, index) => {
    const relatedInteractionsParsed = _.uniq(
        _.reduce(relatedInteractions, (arr, relatedInteraction) => arr.concat(relatedInteraction.slice(0, -1)), [])
    );

    return _.contains(relatedInteractionsParsed, index);
};


const mapInteractions = (quiz) => {
    const isActive = (answer) => {
        return answer.trials === answer.maxTrials || answer.lastGrade === 100;
    };

    const setStatus = (answer) => {
        if (answer.lastGrade === 100) {
            return 'correct';
        }
        if (answer.lastGrade && answer.trials === answer.maxTrials) {
            return 'halfCorrect';
        }
        if (answer.trials === answer.maxTrials && !answer.lastGrade) {
            return 'wrong';
        }
        return 'unread';
    };

    const mapInteraction = (interaction, index) => {

        return INTERACTION_INITIAL_STATE
            .set('id', interaction.id)
            .set('index', index)
            .set('status', setStatus(quiz.answers[index]))
            .set('question', interaction.text)
            .set('textDir', interaction.textDir)
            .set('isActive', !isActive(quiz.answers[index]))
            .set('goToNext', isActive(quiz.answers[index]))
            .set('isRelated', isRelatedInteraction(quiz.relatedInteractions, index))
            .set('interactionType', interaction.interactionType)
            .set('imageUrl', interaction.imageUrl)
            .set('choices', mapChoices(interaction.choices, quiz.answers[index]))
            .set('answer', setAnswer(quiz.answers[index]))
            .set('attachments', mapAttachments(interaction.attachments))
            .set('attachmentStatus', setAttachmentStatus(interaction.attachments));
    };

    return fromJS(quiz.interactions.map(mapInteraction))
};

const subject = (state = initialState, action) => {
    if (action.type.startsWith('interaction/')) {
        return state.updateIn(['interactions'], (interactionItem)=> {
            return fromJS([
                ...interactionItem.slice(0, action.index),
                interaction(interactionItem.get(action.index), action),
                ...interactionItem.slice(action.index + 1)
            ])
        })
    }

    switch (action.type) {
        case SET_QUIZ_INITIAL_STATE:
            return initialState;
        case LOAD_QUIZ_SUCCESS:
            return state
                .set('quizStateId', action.quiz.id)
                .set('interactions', mapInteractions(action.quiz))
                .set('numberOfQuestions', action.quiz.interactions.length)
                .set('isLoading', false)
                .set('showFinalScreen', false)
                .set('error', null);
        case LOAD_QUIZ_ERROR:
            return state
                .set('error', action.error)
                .set('isLoading', false);
        case START_CHANGING_ROUTE_OF_INTERACTION:
            return state
                .set('routeChanging', true);
        case STOP_CHANGING_ROUTE_OF_INTERACTION:
            return state
                .set('routeChanging', false);
        case SET_CURRENT_INTERACTION:
            return state
                .set('currentInteraction', action.currentInteraction)
                .set('error', null);
        case SHOW_FINAL_SCREEN:
            return state
                .set('showFinalScreen', true);
        case BIND_QUIZ_AND_BOOK_NAME:
            return state
                .set('name', action.quizName)
                .set('bookName', action.bookName);
        default:
            return state;
    }
};

export default subject;
