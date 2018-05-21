import React, { Component } from 'react';
import { connect } from "react-redux";
import Nav from './Nav';
import Repos from './Repos';
import Repo from './Repo'
import Stream from './Stream';
import UserSettings from './UserSettings';

class Dashboard extends Component {
    render() {
        return(
            <div id='dashboard-container'>
                <div id='dashboard'>
                    <Nav />
                    { this.props.reposVisible ? <Repos /> : null }
                    { this.props.repoVisible ? <Repo />: null }
                    { this.props.streamVisible ? <Stream /> : null }
                </div>
                { this.props.userSettingsVisible ? <UserSettings /> : null }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    reposVisible: state.repos.visible,
    repoVisible: state.repo.visible,
    userSettingsVisible: state.userSettings.visible,
    streamVisible: state.stream.visible
});

export default connect(
    mapStateToProps
)(Dashboard)