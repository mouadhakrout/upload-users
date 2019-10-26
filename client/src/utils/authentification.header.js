export function authHeader() {
    // return authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('current'));

    if (currentUser && currentUser.token) {
        return { 'Authorization': 'Bearer ' + currentUser.token };
    } else {
        return {};
    }
}
