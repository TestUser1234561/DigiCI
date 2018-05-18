import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Repos extends Component {
    render() {
        return(
            <div id='repos' className='flex flex-column align-center'>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    repos: state.repos.repos
});

export default connect(
    mapStateToProps
)(Repos)