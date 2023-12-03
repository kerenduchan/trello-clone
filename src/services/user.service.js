export const userService = {
    getLoggedInUser,
}

function getLoggedInUser() {
    return {
        _id: 'u102',
        fullname: 'Keren Duchan',
        imgUrl: '/images/keren-avatar.jpg',
    }
}
