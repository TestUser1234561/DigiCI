import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from '../../reducers/reducers';

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
    if(string.length > 1) { delete string[string.length - 1] };

    return(
        <p className={`stream-message ${error ? 'stream-message-error' : null}`}>{string.map((s, i) => <Line key={i} text={s} />)}</p>
    );
};

class Stream extends Component {

    componentWillMount() {
        if (!this.props.stream.stream.history) {
            if (this.props.stream.status === 1) {
                //Connect with StreamClient
            } else {
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
        }
    }

    componentDidUpdate(props) {
        if (props.stream.id !== this.props.stream.id) {
            if (this.props.stream.status === 1) {
                //Connect with StreamClient
            } else {
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
        }
    }

    render() {
        let history;
        if(this.props.stream.stream.history) {
            history = JSON.parse(this.props.stream.stream.history);
        }
        return (
            <div id='stream-view'>
                { this.props.stream.stream.status < 2 ? <i id='stream-connection' className='fas fa-spinner-third fa-spin'/> : null}
                <div id='stream-container'>
                    {this.props.stream.stream.history ? history.map((chunk, i) => <Chunk key={i} chunk={chunk} />) : null}
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