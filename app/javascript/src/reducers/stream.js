//Default state
let defaultState = {
    isFetching: false,
    visible: false,
    id: false,
    stream: {}
};

//Actions
const actions = {
    toggle: 'STREAM_TOGGLE',
    set: 'STREAM_SET'
};

//Action builder
export const stream = {
    toggle: { type: actions.toggle },
    setStatus: (status = false) => { return { type: actions.setStatus, status: status} },
    set: (stream = {}, id) => {
        return { type: actions.set, stream: stream, id: id }
    }
};

//Reducers
export default (state = defaultState, action) => {
    switch(action.type) {
        case actions.toggle:
            return {...state, visible: !state.visible};

        case actions.set:
            return {...state, visible: true, isFetching: false, id: action.id, stream: action.stream };

        default:
            return state;
    }
};