//Import lib
import {combineReducers, createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'

//Import reducers and actions
import userReducer, { user } from "./users";
import repoReducer, { repos } from "./repos";

//Actions
export const actions = {
    user: {...user},
    repos: {...repos}
};

//Reducers
export const reducers = combineReducers({
    user: userReducer,
    repos: repoReducer
});

//Store
export let store = createStore(reducers, compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));