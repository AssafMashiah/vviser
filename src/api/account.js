import instansAxios from './instans';

export function loginApi() {
    const model = {
        "username": "ranros",
        "password": "1234"
    };
    return instansAxios.post('/login', model)
        .then(function (response) {
            instansAxios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            return response.data.token;
        })
}
