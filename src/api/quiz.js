import instansAxios from './instans';

export function loadQuizApi(bookId, quizId) {
    const bookIdHard = '54408d44dd53a361ffafe245';
    return instansAxios.get(`/me/books/${bookIdHard}/quizzes/${quizId}`)
        .then(function (response) {
            return response.data.quizState;
        })
}
