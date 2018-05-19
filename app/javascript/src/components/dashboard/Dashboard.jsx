import React, { Component } from 'react';
import Nav from './Nav';
import Repos from './Repos';
import Repo from './Repo'
import { connect } from "react-redux";

class Dashboard extends Component {
    render() {

        return(
            <div id='dashboard'>
                <Nav />
                { this.props.reposVisible ? <Repos /> : null }
                { this.props.repoVisible ? <Repo />: null }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    reposVisible: state.repos.visible,
    repoVisible: state.repo.visible
});

export default connect(
    mapStateToProps
)(Dashboard)