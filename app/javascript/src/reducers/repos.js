//Default state
let defaultState = {
    visible: false,
    isFetching: false,
    errors: false,
    repos: []
};

//Actions
const actions = {
    startFetch: 'REPOS_START_FETCH',
    finishFetch: 'REPOS_FINISH_FETCH',
    toggle: 'REPOS_TOGGLE',
    add: 'REPOS_ADD',
};

//Action builder
export const repos = {
    startFetch: { type: actions.startFetch },
    finishFetch: { type: actions.finishFetch },
    toggle: { type: actions.toggle },
    add: (repos) => {
        console.log(repos);
        //TODO add repo
    }
};

//Reducers
export default (state = {visible: false, repos: []}, action) => {
    switch(action.type) {
        case actions.toggle:
            return {...state, visible: !state.visible };
        case actions.add:
            return {...state, repos: [...state.repos, ...action.repos]};
        default:
            return state;
    }
};