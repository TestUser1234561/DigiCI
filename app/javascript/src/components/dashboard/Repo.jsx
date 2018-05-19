import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../reducers/reducers";

//Repo loading frame
const Info = ({ error }) => {
    let text = error ?  error : 'Fetching Repo';

    return (
        <div className='flex flex-column flex-center grid-fill'>
            <i id='repos-loading-icon' className='fal fa-sync fa-spin fa-3x'/>
            <span id='repos-loading-text'>{text}</span>
        </div>
    );
};
let Table = ({ repo }) => {
    return(
        <div id='repo-dash'>
        <div id='repo-header'>
            <a href={repo.clone_url}>{repo.repo_name}</a>
            <span className='button'><i className='fal fa-paper-plane' />&nbsp;&nbsp;Run Latest</span>
        </div>
        <div id='repo-runs'>
            <table id='repo-runs-table'>
                <thead>
                <tr>
                    <th>Run</th>
                    <th>Status</th>
                    <th>Started</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
    );
};
class Repo extends Component {
    componentWillReceiveProps(props) {
        //Font Awesome icon switch fix
        let icon = document.getElementById('repos-loading-icon');
        if(icon) {
            if(props.repo.isFetching) {
                icon.setAttribute('data-icon', 'sync');
                icon.setAttribute('data-prefix', 'fal');
                icon.style.color = '#edeaea';
                icon.classList.add('fa-spin')
            } else {
                icon.setAttribute('data-icon', 'exclamation-circle');
                icon.setAttribute('data-prefix', 'fal');
                icon.style.color = '#C43023';
                icon.classList.remove('fa-spin')
            }
        }
    }

    render() {
        let repo = this.props.repo;
        return (
            <div id='repo-view'>
                {   /* Render fetch animation / loading */
                    repo.isFetching || repo.errors ? <Info error={repo.errors} /> : <Table repo={repo.repo}/>
                }
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
)(Repo)