import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "../../reducers/reducers";

const Logo = ({ onLogoClick }) => {
    return(
        <svg id='nav-logo' xmlns="http://www.w3.org/2000/svg" width='35px' height='35px' viewBox="0 0 129.24 151.04" onClick={onLogoClick}>
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

const User = ({ img, toggleUserSettings }) => {
    return(
        <div onClick={toggleUserSettings} id='nav-user'>
            <img src={img} />
        </div>
    ) ;
};

class Nav extends Component {
    onLogoClick() {
        this.props.toggleVisibility();
        this.props.history.push('/dash')
    }

    render() {
        return(
            <div id='nav' className='flex flex-column align-center'>
                <Logo onLogoClick={this.onLogoClick.bind(this)}/>
                <Item icon='fal fa-bars' action={this.props.toggleRepos} />
                <User img={this.props.user.avatar} toggleUserSettings={this.props.toggleUserSettings} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    toggleRepos: () => dispatch(actions.repos.toggle),
    startFetch: () => dispatch(actions.repos.startFetch),
    toggleUserSettings: () => dispatch(actions.userSettings.toggle),
    toggleVisibility: () => {
        dispatch(actions.repo.setVisibility());
        dispatch(actions.stream.setVisibility());
        dispatch(actions.repos.setVisibility());
    }
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav))