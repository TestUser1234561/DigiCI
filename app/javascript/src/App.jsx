import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from "./ProtectedRoute";
import { Provider } from 'react-redux'
import { store, actions } from "./reducers/reducers";
import { rails_data } from "./Utility";

//Components
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

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
        let auth = store.getState().user.id || false;
        return(
            <Provider store={store}>
                <Router>
                    <Switch>
                        <ProtectedRoute exact path='/' auth={auth} redirect='/dash' component={Login} />
                        <Route path='/dash' component={Dashboard} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}