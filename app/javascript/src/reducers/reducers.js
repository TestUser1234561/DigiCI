//Import lib
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

//Import reducers and actions
import userReducer, { user } from "./users";

export const actions = {
    user: {...user}
};

export const reducers = combineReducers({
    user: userReducer
});

export let store = createStore(reducers, applyMiddleware(thunk));