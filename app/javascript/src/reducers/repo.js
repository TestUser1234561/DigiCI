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
    addRun: 'REPO_ADD_RUN',
    updateRun: 'REPO_UPDATE_RUN'
};

//Action builder
export const repo = {
    toggle: (fetch = false, id = false) => {return { type: actions.toggle, isFetching: fetch, id: id }},
    set: (repo = {}, errors = false) => {
        return { type: actions.set, repo: repo, errors: errors }
    },
    addRun: (run = {}) => {
        return { type: actions.addRun, run: run }
    },
    updateRun: (run = {}, id = -1) => {
        return { type: actions.updateRun, run: run, id: id }
    }
};

//Reducers
export default (state = defaultState, action) => {
    switch(action.type) {
        case actions.toggle:
            let visible = action.id !== state.id ? true : !state.visible;
            return {
                ...state,
                visible: visible,
                isFetching: action.isFetching,
                id: action.id
            };

        case actions.set:
            return {
                ...state,
                visible: true,
                isFetching: false,
                id: action.repo.id,
                repo: action.repo,
                errors: action.errors
            };

        case actions.addRun:
            return {
                ...state,
                repo: {
                    ...state.repo,
                    runs: [
                        action.run,
                        ...state.repo.runs
                    ]
                }
            };

        case actions.updateRun:
            let runIndex = state.repo.runs.findIndex((run) => run.id === action.id );
            state.repo.runs[runIndex] = { ...state.repo.runs[runIndex], ...action.run };
            return {...state};

        default:
            return state;
    }
};