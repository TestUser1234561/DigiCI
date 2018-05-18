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
    finishFetch: 'REPOS_FINISH_FETCH',
    filter: 'REPOS_FILTER',
    toggle: 'REPOS_TOGGLE',
    add: 'REPOS_ADD',
};

//Action builder
export const repos = {
    finishFetch: (repos = [], errors = false) => {
        return { type: actions.finishFetch, repos: repos, errors: errors }
    },
    filter: (arr = false) => {return { type: actions.filter, filter: arr}},
    toggle: { type: actions.toggle },
    add: (repos) => {
        console.log(repos);
        //TODO add repo
    }
};

//Reducers
export default (state = defaultState, action) => {
    switch(action.type) {
        case actions.toggle:
            let fetch = !state.fetched;
            return {...state, visible: !state.visible, isFetching: fetch };

        case actions.add:
            return {...state, repos: [...state.repos, ...action.repos]};

        case actions.finishFetch:
            return {...state, fetched: true, isFetching: false, repos: action.repos, errors: action.errors};

        case actions.filter:
            return { ...state, filter: action.filter };

        default:
            return state;
    }
};