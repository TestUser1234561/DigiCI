import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../reducers/reducers';
import {withRouter} from "react-router-dom";

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

let Run = ({ run, onRunStreamClick }) => {
    return(
        <tr className='repo-run'>
            <td>
                <div className='repo-run-commit'>
                    <div className='repo-run-datastream'><i className='far fa-stream' />
                        <span className={run.status ? 'repo-run-datastream-button' : null} onClick={() => {onRunStreamClick(run)}}>{run.uuid.slice(0, 8)}</span>
                    </div>
                    {run.commit ? <div><i className='fal fa-code-commit' data-fa-transform='rotate-90' />{run.commit}</div> : null}
                    <div><i className='far fa-code-branch' />Master</div>
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

let Table = ({ repo, onRunLatest, onRunStreamClick }) => {
    return(
        <div id='repo-dash'>
        <div id='repo-header'>
            <a href={repo.clone_url}>{repo.name}</a>
            <span className='button' onClick={onRunLatest}><i className='fal fa-paper-plane' />&nbsp;&nbsp;Run Latest</span>
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
                    { repo.runs.map((r) => {return <Run key={r.id} run={r} onRunStreamClick={onRunStreamClick} />}) }
                </tbody>
            </table>
        </div>
    </div>
    );
};

class Repo extends Component {
    constructor(props) {
        super(props);

        this.onRunLatest = this.onRunLatest.bind(this);
        this.updateRun = this.updateRun.bind(this);
        this.onRunStreamClick = this.onRunStreamClick.bind(this)
    }

    componentWillMount() {
        //Subscribe to repo update channel if no subscriptions active
        if(App.cable.subscriptions['subscriptions'].length === 0) {
            App.cable.subscriptions.create({ channel: 'RepoChannel', repo: this.props.repo.id }, {
                received: (data) => {
                    this.updateRun(data)
                }
            });
        }
    }

    componentWillUpdate(props) {
        //Unsubscribe to olf channel and sub to new if the repo being viewed is different
        if(props.repo.id !== this.props.repo.id) {
            //Remove old subscription
            if (App.cable.subscriptions['subscriptions'].length > 0) {
                App.cable.subscriptions.remove(App.cable.subscriptions['subscriptions'][0])
            }

            //Subscribe to updated channel
            App.cable.subscriptions.create({ channel: 'RepoChannel', repo: props.repo.id }, {
                received: (data) => {
                    this.updateRun(data)
                }
            });
        }
    }

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

    componentDidUpdate() {
        this.updateStatusIcons();
    }

    updateRun(data) {
        let id = data.stream;
        delete data.stream;
        this.props.updateRun(data, id)
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
                    case 1:
                        icon.setAttribute('data-icon', 'spinner-third');
                        icon.classList.add('fa-spin');
                        break;
                    case 2:
                        icon.setAttribute('data-icon', 'check');
                        icon.classList.remove('fa-spin');
                        break;
                    case 3:
                        icon.setAttribute('data-icon', 'exclamation');
                        icon.classList.remove('fa-spin');
                        break;
                }
            });
        }
    }

    onRunLatest() {
        fetch(`/api/repo/${this.props.repo.id}/stream`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((content) => content.json()).then((data) => {
            this.props.addRun(data);
        })
    }

    onRunStreamClick(run) {
        //Return on status 0, data is not streaming.
        if(run.status === 0) { return; }

        let stream = this.props.stream;

        if(stream.id === run.id) {
            if(this.props.match.params.stream === `${run.id}${run.uuid.slice(0, 8)}`) {
                this.props.history.push(`/dash/${this.props.repo.repo.name}`)
            } else {
                this.props.history.push(`/dash/${this.props.repo.repo.name}/${run.id}${run.uuid.slice(0, 8)}`)
            }
            this.props.toggleStream();
        } else {
            this.props.history.push(`/dash/${this.props.repo.repo.name}/${run.id}${run.uuid.slice(0, 8)}`);
            this.props.setStream(run, run.id)
        }
    }

    render() {
        let repo = this.props.repo;
        return (
            <div id='repo-view'>
                {   /* Render fetch animation / loading */
                    repo.isFetching || repo.errors ? <Info error={repo.errors} /> :
                        <Table repo={repo.repo} onRunLatest={this.onRunLatest} onRunStreamClick={this.onRunStreamClick}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    repo: state.repo,
    user: state.user,
    stream: state.stream
});

const mapDispatchToProps = (dispatch) => ({
    addRun: (run) => dispatch(actions.repo.addRun(run)),
    updateRun: (run, id) => dispatch(actions.repo.updateRun(run, id)),
    toggleStream: () => dispatch(actions.stream.toggle),
    setStream: (stream, id) => dispatch(actions.stream.set(stream, id))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Repo))