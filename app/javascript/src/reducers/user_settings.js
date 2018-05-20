//Default state
let defaultState = {
    visible: false,
    validApiKey: false,
};

//Actions
const actions = {
    toggle: 'USER_SETTINGS_TOGGLE',
    set: 'USER_SETTINGS_SET_API',
};

//Action builder
export const userSettings = {
    toggle: { type: actions.toggle },
    set: (api) => {return { type: actions.set, api: api }}
};

//Reducers
export default (state = defaultState, action) => {
    switch(action.type) {
        case actions.toggle:
            return {...state, visible: !state.visible};
        case actions.set:
            return {...state, validApiKey: action.api};
        default:
            return state;
    }
};