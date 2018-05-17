import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store, actions } from "./reducers/reducers";
import { rails_data } from "./Utility";

//Components
import Login from './components/login/Login';

//SCSS Hot reload TODO: remove
require('../../assets/stylesheets/global.scss');

//App
export default class App extends Component {
    componentDidMount() {
        //State debugging TODO: remove
        store.subscribe(() => {
            console.log(store.getState())
        });

        let data = rails_data('user');
        if(data) { store.dispatch(actions.user.login(data)) }
    }

    render() {
        return(
            <Provider store={store}>
                <Router>
                    <Route exact path='/' component={Login} />
                </Router>
            </Provider>
        );
    }
}