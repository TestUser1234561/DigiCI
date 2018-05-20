//Default state
let defaultState = {
    isFetching: false,
    visible: false,
    uuid: false,
    status: false,
    stream: []
};

//Actions
const actions = {
    toggle: 'STREAM_TOGGLE',
    setStatus: 'STREAM_STATUS',
    set: 'STREAM_SET'
};

//Action builder
export const stream = {
    toggle: (fetch = false, id = false) => {return { type: actions.toggle, isFetching: fetch, uuid: id } },
    setStatus: (status = false) => { return { type: actions.setStatus, status: status} },
    set: (stream = [], uuid) => {
        return { type: actions.set, stream: stream, uuid: uuid }
    }
};

//Reducers
export default (state = defaultState, action) => {
    switch(action.type) {
        case actions.toggle:
            let visible = action.uuid !== state.uuid ? true : !state.visible;
            return {...state, visible: visible, isFetching: action.isFetching, uuid: action.uuid };

        case actions.set:
            return {...state, visible: true, isFetching: false, id: action.uuid, stream: action.stream };

        case actions.setStatus:
            return {...state, status: action.status};

        default:
            return state;
    }
};