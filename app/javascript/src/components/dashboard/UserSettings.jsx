import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../reducers/reducers";

class UserSettings extends Component {
    constructor(props) {
        super(props);

        this.updateApiKey = this.updateApiKey.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick(e) {
        //Check if the user clicked inside the element
        if (this.node.contains(e.target) || document.getElementById('nav-user').contains(e.target)) {
            return;
        }

        //Toggle the user settings window
        this.props.toggleUserSettings();
    }

    logOut() {
        //Log the user out and remove user state
        fetch(`/sign_out`, {
            credentials: 'same-origin'
        }).then(() => {
            this.props.signUserOut();
        });
    }

    updateApiKey(e) {
        if(e.key === 'Enter') {
            //Get key value and remove it from dom
            let ele = document.getElementById('user-api-key-box');
            let key = ele.value;
            ele.value = '';

            //Add loading icon
            let icon = document.getElementById('user-api-key').childNodes[0];
            icon.setAttribute('data-icon', 'spinner-third');
            icon.classList.add('fa-spin');

            //Update user api key
            fetch(`/api/user`, {
                credentials: 'include',
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token_do: key})
            }).then(() => {
                //Get icon again, old reference wont work.
                let icon = document.getElementById('user-api-key').childNodes[0];
                icon.setAttribute('data-icon', 'check-circle');
                icon.classList.remove('fa-spin');
                //Set user api key to true
                this.props.setUserApiKey(true);
            });
        }
    }

    render() {
        //Get appropriate icon
        let icon = this.props.userSettings.validApiKey || this.props.userToken ? <i className='fal fa-check-circle' /> : <i className='fal fa-exclamation-circle' />;

        return (
            <div id='user-settings' className='flex flex-column align-center' ref={node => this.node = node}>
                <span>{this.props.user.name}</span>
                <div id='user-api-key' onClick={() => { document.getElementById('user-api-key-box').focus() }}>
                    {icon}
                    <input type='password' placeholder='API Key' id='user-api-key-box' onKeyPress={this.updateApiKey} />
                </div>
                <a id='user-settings-logout' onClick={this.logOut.bind(this)}>Logout</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    userSettings: state.userSettings,
    userToken: state.user.token_do
});

const mapDispatchToProps = (dispatch) => ({
    signUserOut: () => dispatch(actions.user.logout),
    toggleUserSettings: () => dispatch(actions.userSettings.toggle),
    setUserApiKey: (value = true) => dispatch(actions.userSettings.set(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSettings)