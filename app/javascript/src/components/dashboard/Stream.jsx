import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from '../../reducers/reducers';
import StreamClient from '../../StreamClient';

function isIP(string) {
    try {
        return !!string.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
    } catch(e) {
        return false;
    }
}

let Line = ({text}) => {
    return(
        <span>{text}<br/></span>
    )
};

const Chunk = ({chunk}) => {
    let string, error;

    //Check for error or stdout chunk
    if(chunk.error) {
        string = JSON.stringify(chunk.error).replace(/^["{](.*)[}"]$/, '$1').split('\\n');
        error = true
    } else {
        string = JSON.stringify(chunk.stdout).replace(/^"(.*)"$/, '$1').split('\\n');
    }

    //Remove last new line
    if(string.length > 1) { delete string[string.length - 1] }

    return(
        <p className={`stream-message ${error ? 'stream-message-error' : null}`}>{string.map((s, i) => <Line key={i} text={s} />)}</p>
    );
};

class Stream extends Component {
    constructor(props) {
        super(props);

        this.streamHistory = this.streamHistory.bind(this)
    }


    componentWillMount() {
        if (!this.props.stream.stream.history) {
            //Fetch from database
            fetch(`/api/repo/${this.props.repo.id}/stream/${this.props.stream.id}/history`, {
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((content) => content.json()).then((data) => {
                this.props.updateHistory(data.history);
            });
        } else {
            if(this.props.stream.stream.status === 1 && isIP(this.props.stream.stream.history)) {
                window.streamClient = new StreamClient(this.props.stream.stream.history, this.streamHistory)
            }
        }
    }

    componentDidUpdate(props) {
        if (props.stream.id !== this.props.stream.id) {
            //Fetch from database
            fetch(`/api/repo/${this.props.repo.id}/stream/${this.props.stream.id}/history`, {
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((content) => content.json()).then((data) => {
                this.props.updateHistory(data.history);
            });
        }

        //Start new client if no client exists and a connection can be made
        if(!window.streamClient && this.props.stream.stream.status === 1 && isIP(this.props.stream.stream.history)) {
            window.streamClient = new StreamClient(this.props.stream.stream.history, this.streamHistory)
        }

        //If the stream status updates then close the stream
        if(this.props.stream.stream.status > 1 && window.streamClient) {
            window.streamClient.close(); window.streamCleint = undefined;
        }
    }

    componentWillUnmount() {
        //Close stream
        if(window.streamClient) { window.streamClient.close(); window.streamCleint = undefined; }
    }

    streamHistory(history) {
        //Update history
        if(history.history) {
            this.props.updateHistory(JSON.stringify(history.history));
        } else {
            this.props.updateHistory(JSON.stringify([...JSON.parse(this.props.stream.stream.history), history]));
        }

        //Update scroll height
        let view = document.getElementById('stream-view');
        view.scrollTop = view.scrollHeight;
    }

    render() {
        let history;
        if(this.props.stream.stream.history) {
            try {
                history = JSON.parse(this.props.stream.stream.history);
            } catch (e) {}
        }

        return (
            <div id='stream-view'>
                { this.props.stream.stream.status < 2 ? <i id='stream-connection' className='fas fa-spinner-third fa-spin'/> : null}
                <div id='stream-container'>
                    {!!history ? history.map((chunk, i) => <Chunk key={i} chunk={chunk} />) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    repo: state.repo,
    stream: state.stream
});

const mapDispatchToProps = (dispatch) => ({
    updateHistory: (history) => dispatch(actions.stream.updateHistory(history))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stream)