import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "../../reducers/reducers";

const Logo = ({ history }) => {
    return(
        <svg id='nav-logo' xmlns="http://www.w3.org/2000/svg" width='35px' height='35px' viewBox="0 0 129.24 151.04" onClick={() => { history.push('/dash') }}>
            <path
                style={{fill: '#1678ff'}}
                d="M0 0h29v151H0zM100.26 14.71C83.51 2.26 65.17 0 44.12 0H39v26h4.2c9.94 0 24.83.9 37 9.93 12 9 18.51 24.38 18.51 40.18 0 16-6.77 31.38-18.73 40-13.1 9.48-29.35 9.93-36.8 9.93H39v25h4.67c21 0 37.58-2 55.24-14.49 19.92-14 30.33-35.77 30.33-60.9s-10.64-47.13-28.98-60.94z"
            />
        </svg>
    );
};

const Item = ({ icon, action = null }) => {
    icon = icon.concat(' nav-icon');
    return(
        <div onClick={action} className='nav-item'><i className={icon} /></div>
    );
};

class Nav extends Component {
    render() {
        return(
            <div id='nav' className='flex flex-column align-center'>
                <Logo history={this.props.history}/>
                <Item icon='fal fa-bars' action={this.props.toggleRepos} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    toggleRepos: () => dispatch(actions.repos.toggle),
    startFetch: () => dispatch(actions.repos.startFetch)
});

export default connect(
    null,
    mapDispatchToProps
)(Nav)