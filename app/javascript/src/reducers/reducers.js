//Import lib
import {combineReducers, createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'

//Import reducers and actions
import userReducer, { user } from "./users";
import reposReducer, { repos } from "./repos";
import repoReducer, { repo } from "./repo";
import streamReducer, { stream } from './stream';
import userSettingsReducer, { userSettings } from "./user_settings";

//Actions
export const actions = {
    user: {...user},
    userSettings: {...userSettings},
    repos: {...repos},
    repo: {...repo},
    stream: {...stream}
};

//Reducers
export const reducers = combineReducers({
    user: userReducer,
    userSettings: userSettingsReducer,
    repos: reposReducer,
    repo: repoReducer,
    stream: streamReducer
});

//Store
export let store = createStore(reducers, compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));