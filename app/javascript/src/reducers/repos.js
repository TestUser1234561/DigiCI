//Default state
let defaultState = {
    visible: false,
    isFetching: false,
    fetched: false,
    errors: false,
    filter: false,
    repos: []
};

//Actions
const actions = {
    finishReposFetch: 'REPOS_FINISH_FETCH',
    setVisibility: 'REPOS_SET_VISIBILITY',
    filter: 'REPOS_FILTER',
    toggle: 'REPOS_TOGGLE',
    add: 'REPOS_ADD',
};

//Action builder
export const repos = {
    finishReposFetch: (repos = [], errors = false) => {
        return { type: actions.finishReposFetch, repos: repos, errors: errors }
    },
    filter: (arr = false) => {return { type: actions.filter, filter: arr}},
    setVisibility: (visibility = false) => { return { type: actions.setVisibility, visibility: visibility } },
    toggle: { type: actions.toggle },
    add: (repo) => {
        return { type: actions.add, repo: repo }
    }
};

//Reducers
export default (state = defaultState, action) => {
    switch(action.type) {
        case actions.toggle:
            let fetch = !state.fetched;
            return {...state, visible: !state.visible, isFetching: fetch };

        case actions.setVisibility:
            return {...state, visible: action.visibility};

        case actions.add:
            return {...state, repos: [...state.repos, action.repo]};

        case actions.finishReposFetch:
            return {...state, fetched: true, isFetching: false, repos: action.repos, errors: action.errors};

        case actions.filter:
            return { ...state, filter: action.filter };

        default:
            return state;
    }
};