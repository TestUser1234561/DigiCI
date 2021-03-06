//Default state
let defaultState = {
    visible: false,
    id: false,
    stream: {}
};

//Actions
const actions = {
    toggle: 'STREAM_TOGGLE',
    setVisibility: 'STREAM_SET_VISIBILITY',
    set: 'STREAM_SET',
    updateHistory: 'STREAM_UPDATE_HISTORY'
};

//Action builder
export const stream = {
    toggle: { type: actions.toggle },
    setVisibility: (visibility = false) => { return { type: actions.setVisibility, visibility: visibility } },
    setStatus: (status = false) => { return { type: actions.setStatus, status: status} },
    set: (stream = {}, id) => {
        return { type: actions.set, stream: stream, id: id }
    },
    updateHistory: (history = []) => {
        return { type: actions.updateHistory, history: history }
    }
};

//Reducers
export default (state = defaultState, action) => {
    switch(action.type) {
        case actions.toggle:
            return {...state, visible: !state.visible};

        case actions.setVisibility:
            return {...state, visible: action.visibility};

        case actions.set:
            return {...state, visible: true, isFetching: false, id: action.id, stream: action.stream };

        case actions.updateHistory:
            return {...state, stream: {...state.stream, history: action.history} };

        default:
            return state;
    }
};