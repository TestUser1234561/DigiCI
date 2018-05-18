import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../reducers/reducers";
import Fuse from 'fuse.js'

let spawned = false;

//Loading frame
const Loading = () => {
    return(
        <div className='flex flex-column flex-center'>
            <i id='repos-loading-icon' className='fas fa-circle-notch fa-spin fa-3x' />
            <span id='repos-loading-text'>Grabbing Repos</span>
        </div>
    );
};

//Search component
const Search = (args) => {

    let fuse = new Fuse(args.repos, {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 50,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "name"
        ]
    });

    return(
        <div id='repos-search' onClick={() => { document.getElementById('repos-search-box').focus() }}>
            <i className="fal fa-search" />
            <input type='text' id='repos-search-box' onKeyUp={() => {
                let value = document.getElementById('repos-search-box').value;
                args.dispatch(value, fuse.search(value))
            }} />
        </div>
    );
};

const Add = (args) => {
    return(
        <div id='repos-add' className='repos-repo' onClick={() => {
            fetch('/api/repo', {
                method: 'post',
                credentials: 'same-origin',
                body: {
                    name: args.name
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        }}><i className='fal fa-plus-circle' /><span>{args.name}</span></div>
    );
};

class Repos extends Component {

    componentDidMount() {
        if(!spawned) {
            spawned = true;

            //Fetch repos
            fetch(`/api/repos.json`, {credentials: 'same-origin'})
            .then((response) => response.json())
            .then((data) => {
                this.props.finishFetch(data)
            });
        }
    }

    render() {
        let center = this.props.loading ? 'flex-center' : '';
        return(
            <div id='repos' className={`flex flex-column ${center}`}>
                {   /* Display loading screen or search box if repos are loaded */
                    this.props.loading ? <Loading />: <Search repos={this.props.repos} dispatch={this.props.onKeyDownFilter} />
                }
                {   /* Add repo button if its not found in database */
                    this.props.filter && !this.props.filter.results.includes(this.props.filter.string) ?
                    <Add name={this.props.filter.string} /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.repos.isFetching,
    fetched: state.repos.fetched,
    errors: state.repos.errors,
    repos: state.repos.repos,
    filter: state.repos.filter,
    user_id: state.user.id
});

const mapDispatchToProps = (dispatch) => ({
    onKeyDownFilter: (str = '', result = []) => dispatch(actions.repos.filter(str === '' ? false : {string: str, results: result})),
    finishFetch: () => dispatch(actions.repos.finishFetch())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Repos)