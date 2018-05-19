//Default state
let defaultState = {
    isFetching: false,
    visible: false,
    errors: false,
    repo: {}
};

//Actions
const actions = {
    finishRepoFetch: 'REPO_FINISH_FETCH',
    toggle: 'REPO_TOGGLE',
    set: 'REPO_SET',
};

//Action builder
export const repo = {
    finishRepoFetch: (repo = [], errors = false) => {
        return { type: actions.finishRepoFetch, repo: repo, errors: errors }
    },
    toggle: (fetch = false) => {return { type: actions.toggle, isFetching: fetch }},
    set: (repo = {}) => {
        return { type: actions.set, repo: repo }
    }
};

//Reducers
export default (state = defaultState, action) => {
    switch(action.type) {
        case actions.toggle:
            return {...state, visible: !state.visible, isFetching: action.isFetching };

        case actions.set:
            return {...state, repo: action.repo};

        case actions.finishRepoFetch:
            return {...state, isFetching: false, repo: action.repo, errors: action.errors};

        default:
            return state;
    }
};