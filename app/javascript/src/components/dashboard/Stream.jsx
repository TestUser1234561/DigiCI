import React, { Component } from 'react';
import { connect } from "react-redux";

class Stream extends Component {
    render() {
        return (
            <div id='stream-view'>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    repo: state.repo,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stream)