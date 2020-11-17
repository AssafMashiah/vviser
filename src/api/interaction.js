import instansAxios from './instans';

export function answerInteractionApi(quizStateId, interactionIndex, interactionType, answer) {
    const model = {
        interactionType: interactionType,
        answer: answer,
    };

    return instansAxios.post(
        `/me/quizstates/${quizStateId}/interactions/${interactionIndex}`,
        model
    ).then(function (response) {
        return response.data;
    })
}
