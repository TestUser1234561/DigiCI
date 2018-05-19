import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ProtectedRoute } from "./ProtectedRoute";
import { connect } from 'react-redux'
import { store, actions } from "./reducers/reducers";
import { rails_data } from "./Utility";

//Components
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

//SCSS Hot reload TODO: remove
require('../../assets/stylesheets/global.scss');

//App
class App extends Component {
    componentDidMount() {
        let data = rails_data('user');
        if(data) { store.dispatch(actions.user.login(data)) }
    }

    render() {
        let auth = !!this.props.user.id;
        return(
            <Router>
                <Switch>
                    <ProtectedRoute exact path='/' auth={!auth} redirect='/dash' component={Login} />
                    <ProtectedRoute exact path='/dash' auth={auth} component={Dashboard} />
                    <ProtectedRoute exact path='/dash/:repo' auth={auth} component={Dashboard} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(
    mapStateToProps
)(App)