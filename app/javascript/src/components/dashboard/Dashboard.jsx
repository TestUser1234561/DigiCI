import React, { Component } from 'react';
import Nav from './Nav';
import Repos from './Repos';
import { connect } from "react-redux";
import { actions } from "../../reducers/reducers";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
    render() {

        const repos = this.props.reposVisible ? <Repos /> : null;

        return(
            <div id='dashboard'>
                <Nav />
                { repos }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    reposVisible: state.repos.visible
});

export default connect(
    mapStateToProps
)(Dashboard)