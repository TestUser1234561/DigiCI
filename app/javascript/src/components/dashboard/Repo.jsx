import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../reducers/reducers";

class Dashboard extends Component {
    render() {

        return(
            <div id='repo-view'>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

export default connect(
    mapStateToProps
)(Dashboard)