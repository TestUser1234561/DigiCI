const actions = {
    login: 'USER_LOGIN',
    logout: 'USER_LOGOUT'
};

export const user = {
    login: (user) => {
        return { type: actions.login, user: user }
    },
    logout: { type: actions.logout }
};

export default (state = {}, action) => {
    switch(action.type) {
        case actions.login:
            return action.user;
        case actions.logout:
            return {};
        default:
            return state;
    }
}
