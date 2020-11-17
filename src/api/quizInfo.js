import instansAxios from './instans';

export function loadQuizInfoApi(stateId) {
    return instansAxios.get(`/me/quizstates/${stateId}`)
        .then(function (response) {
            return response.data;
        })
}
