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

const Status = ({ code }) => {
    let icon, text, color;
    switch(parseInt(code)) {
        case 0:
            icon = <i className='fas fa-spinner-third fa-spin' />;
            text = 'Spinning Up';
            color = 'status-blue';
            break;
        case 1:
            icon = <i className='fas fa-spinner-third fa-spin' />;
            text = 'Running';
            color = 'status-blue';
            break;
        case 2:
            icon = <i className='fas fa-check' />;
            text = 'Success';
            color = 'status-green';
            break;
        case 3:
            icon = <i className='fas fa-exclamation' />;
            text = 'Fail';
            color = 'status-red';
            break;
    }

    return(
        <div className={`repo-run-status ${color}`} data-code={code}>
            {icon}<span>{text}</span>
        </div>
    );
};

let Run = ({ run }) => {
    return(
        <tr className='repo-run'>
            <td>
                <div className='repo-run-commit'>
                    <div className='repo-run-datastream'><i className='far fa-stream' />
                        <span className='repo-run-datastream-button'>uuid198dfj12</span>
                    </div>
                    <div><i className='fal fa-code-commit' data-fa-transform='rotate-90' />{run.commit}</div>
                    <div><i className='fal fa-code-branch' />Master</div>
                </div>
            </td>
            <td>
                <div>
                    <Status code={run.status} />
                </div>
            </td>
            <td>
                {run.created_at}
            </td>
        </tr>
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
                    { repo.runs.map((r) => {return <Run key={r.id} run={r} />}) }
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

        //this.updateStatusIcons();
    }

    componentDidUpdate() {
        //Wait for Font Awesome js to update icons to SVG
        ///setTimeout(() => {
        ///    this.updateStatusIcons();
        ///}, 50);
    }

    //Font Awesome status icon switch fix
    updateStatusIcons() {
        let status = document.getElementsByClassName('repo-run-status');
        if(status.length > 0) {
            Array.prototype.forEach.call(status, (el) => {
                let code = el.dataset['code'];
                let icon = el.childNodes[0];

                switch(parseInt(code)) {
                    case 0:
                        console.log(code, icon);///
                        icon.setAttribute('data-icon', 'sync');
                        icon.setAttribute('data-prefix', 'fal');
                        icon.classList.remove('fa-spin');
                        break;
                }
            });
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