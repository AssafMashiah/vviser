import instansAxios from './instans';

export function loadCategoriesApi() {
    return instansAxios.get('/me')
        .then(function (response) {
            return response.data.user.books;
        })
}
