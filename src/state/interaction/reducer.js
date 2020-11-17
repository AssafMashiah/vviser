import {
    SELECT_RADIO_INTERACTION,
    SELECT_CHECKBOX_INTERACTION,
    CHECK_INTERACTION_REQUEST,
    CHECK_INTERACTION_SUCCESS,
    CHECK_INTERACTION_ERROR,
    SHOW_RIGHT_ANSWER,
    SHOW_GO_TO_NEXT,
    SET_INTERACTION_STATUS,
    SET_INTERACTION_READ,
    OPEN_ATTACHMENT_POPUP,
    CLOSE_ATTACHMENT_POPUP,
    SET_ATTACHMENT_TYPE,
} from '../action-types';
import {List, fromJS} from 'immutable';

import _ from 'underscore';

import {
    questionStatusColors,
    interactionTypes,
    textDirection,
} from '../../constants';

export const INITIAL_STATE_ATTACHMENT = fromJS({
    type: null,
    isOpen: false,
    isActive: false,
});

export const INITIAL_STATE_ANSWER = fromJS({
    trials: 0,
    maxTrials: 1,
    lastAnswer: null,
    lastGrade: 0
});

export const INITIAL_STATE = fromJS({
    id: null,
    error: null,
    textDir: textDirection.RTL,
    status: "unread", // information, correct, halfCorrect, wrong, read
    statusColorSteps: questionStatusColors.SELECTED,
    interactionType: "", // MMC, MultipleChoice
    correctAnswer: null,
    isLoading: false,
    isRead: false,
    isRelated: false, //is related to next
    isActive: true, //when attempts ended - false
    isSelected: false, // when choice(s) selected - true
    goToNext: false,
    question: "",
    imageUrl: "",
    // currentStep: 0,
    steps: 2,
    attachmentStatus: INITIAL_STATE_ATTACHMENT,
    attachments: fromJS({}),
    answer: INITIAL_STATE_ANSWER,
    choices: fromJS([]),
});

const clearStatuses = choices => choices.map(choice => {
    return choice
        .set('isCorrect', false)
        .set('isHalfCorrect', false)
        .set('isWrong', false);
});

const selectInteractionAnswer = (state, indexAnswer, resetSelected) => {
    const updateChoices = items => {
        // const i = items.toJS();
        if (indexAnswer !== -1) {
            if (resetSelected) {
                return items.map((item, index) => {
                    if (indexAnswer === index) {
                        return item.set('isSelected', true)
                    } else {
                        return item.set('isSelected', false)
                    }
                })
            }
            return items.update(indexAnswer, (item) =>
                item.updateIn(['isSelected'], ic => !ic));
        }
        return items;
    };

    return state
        .updateIn(['choices'], clearStatuses)
        .updateIn(['choices'], updateChoices)
        .set('isSelected', true);
};

const checkAnswer = (state, statusAnswer) => {
    const updateStatus = choices => choices.map(choice => {
        const isSelected = choice.get('isSelected');

        if (isSelected && statusAnswer.grade === 100) {
            return choice.set('isCorrect', true);
        } else {
            if (isSelected) {
                return choice.set('isWrong', true);
            }
        }
        return choice;
    });

    const setInteractionStatus = (isColor) => {
        if (statusAnswer.grade) {
            if (statusAnswer.grade === 100) {
                return (isColor) ? questionStatusColors.CORRECT : 'correct';
            } else {
                return (isColor) ? questionStatusColors.HALF_CORRECT : 'halfCorrect';
            }
        } else {
            return (isColor) ? questionStatusColors.WRONG : 'wrong';
        }
    };

    const isActive = () => {
        const steps = state.get('steps');
        let isActive = true;

        if (steps === Number(state.getIn(['answer', 'trials']) + 1) || (statusAnswer.grade === 100)) {
            isActive = false;
        }
        return isActive;
    };

    const incTrial = (answer) => answer
        .set('trials', answer.get('trials') + 1);

    return state
        .set('isLoading', false)
        .updateIn(['answer'], incTrial)
        .set('status', setInteractionStatus())
        .set('statusColorSteps', setInteractionStatus(true))
        .set('isActive', isActive())
        .set('isSelected', false)
        .set('correctAnswer', statusAnswer.correctAnswer)
        .updateIn(['choices'], clearStatuses)
        .updateIn(['choices'], updateStatus);
};

const showRightAnswer = (state) => {
    const correctAnswer = state.get('correctAnswer');
    const interactionType = state.get('interactionType');

    const checkIsRight = (index) => {
        if (interactionType === interactionTypes.MULTIPLE_CHOICE) {
            return index === correctAnswer;
        }
        if (interactionType === interactionTypes.MMC) {
            return _.contains(correctAnswer, index);
        }
        return false;
    };

    const updateStatus = choices => choices.map((choice, index) => {
        const isWrong = choice.get('isWrong');

        if (checkIsRight(index)) {
            return choice
                .set('isCorrect', true)
                .set('isSelected', true);
        }
        return choice;
    });

    return state
        .updateIn(['choices'], updateStatus)
        .set('goToNext', true)
        .set('isSelected', true);
};

const setAttachmentType = (state, attachmentType) => {
    const updateAttachmentStatus = attachmentStatus => {
        return attachmentStatus
            .set('type', attachmentType)
            .set('isOpen', true);
    };

    return state.updateIn(['attachmentStatus'], updateAttachmentStatus);
};

const openAttachmentPopup = (attachmentStatus) => attachmentStatus.set('isOpen', true);
const closeAttachmentPopup = (attachmentStatus) => attachmentStatus.set('isOpen', false);

const interaction = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_INTERACTION_REQUEST:
            return state
                .set('isLoading', true);
        case CHECK_INTERACTION_SUCCESS:
            return checkAnswer(state, action.statusAnswer);
        case CHECK_INTERACTION_ERROR:
            return state
                .set('error', action.error)
                .set('isLoading', false);
        case SHOW_RIGHT_ANSWER:
            return showRightAnswer(state);
        case SHOW_GO_TO_NEXT:
            return state.set('goToNext', true);
        case SELECT_RADIO_INTERACTION:
            return selectInteractionAnswer(state, action.indexAnswer, true);
        case SELECT_CHECKBOX_INTERACTION:
            return selectInteractionAnswer(state, action.indexAnswer);
        case SET_INTERACTION_READ:
            return state
                .set('status', 'read')
                .set('isRead', true);
        case SET_INTERACTION_STATUS:
            return state.set('status', action.status);
        case OPEN_ATTACHMENT_POPUP:
            return state.updateIn(['attachmentStatus'], openAttachmentPopup);
        case CLOSE_ATTACHMENT_POPUP:
            return state.updateIn(['attachmentStatus'], closeAttachmentPopup);
        case SET_ATTACHMENT_TYPE:
            return setAttachmentType(state, action.attachmentType);
        default:
            return state;
    }
};

export default interaction;
