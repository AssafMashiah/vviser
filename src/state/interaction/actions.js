import {
    SET_QUESTIONS,
    CHECK_INTERACTION_REQUEST,
    SHOW_RIGHT_ANSWER,
    SHOW_GO_TO_NEXT,
    SELECT_RADIO_INTERACTION,
    SELECT_CHECKBOX_INTERACTION,
    SET_INTERACTION_STATUS,
    SET_INTERACTION_READ,
    OPEN_ATTACHMENT_POPUP,
    CLOSE_ATTACHMENT_POPUP,
    SET_ATTACHMENT_TYPE,
} from '../action-types';

export const setQuestions = (interactions) => ({
    type: SET_QUESTIONS,
    interactions,
});

export const selectRadioQuestion = (indexAnswer) => ({
    type: SELECT_RADIO_INTERACTION,
    indexAnswer,
});

export const selectCheckboxQuestion = (indexAnswer) => ({
    type: SELECT_CHECKBOX_INTERACTION,
    indexAnswer,
});

export const setInteractionRead = () => ({
    type: SET_INTERACTION_READ,
});

export const checkInteraction = (model) =>({
    type: CHECK_INTERACTION_REQUEST,
    model
});

export const openAttachmentPopup = () => ({
    type: OPEN_ATTACHMENT_POPUP,
});

export const closeAttachmentPopup = () => ({
    type: CLOSE_ATTACHMENT_POPUP,
});

export const setAttachmentType = (attachmentType) => ({
    type: SET_ATTACHMENT_TYPE,
    attachmentType,
});

export const showRightAnswer = () => ({
    type: SHOW_RIGHT_ANSWER,
});

export const showGoToNext = () => ({
    type: SHOW_GO_TO_NEXT,
});

export const setInteractionStatus = (status) => ({
    type: SET_INTERACTION_STATUS,
    status,
});
