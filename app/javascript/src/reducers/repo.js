//Default state
let defaultState = {
    isFetching: false,
    visible: false,
    errors: false,
    id: false,
    repo: {}
};

//Actions
const actions = {
    toggle: 'REPO_TOGGLE',
    set: 'REPO_SET',
};

//Action builder
export const repo = {
    toggle: (fetch = false, id = false) => {return { type: actions.toggle, isFetching: fetch, id: id }},
    set: (repo = {}, errors = false) => {
        return { type: actions.set, repo: repo, errors: errors }
    }
};

//Reducers
export default (state = defaultState, action) => {
    switch(action.type) {
        case actions.toggle:
            let visible = action.id !== state.id ? true : !state.visible;
            return {...state, visible: visible, isFetching: action.isFetching, id: action.id };

        case actions.set:
            return {...state, isFetching: false, repo: action.repo, errors: action.errors};

        default:
            return state;
    }
};