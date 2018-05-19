import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom'
import { actions } from "../../reducers/reducers";
import Fuse from 'fuse.js'

let spawned = false;

//Repos loading frame
const Loading = () => {
    return(
        <div className='flex flex-column flex-center'>
            <i id='repos-loading-icon' className='fas fa-circle-notch fa-spin fa-3x' />
            <span id='repos-loading-text'>Grabbing Repos</span>
        </div>
    );
};

//Search repos box
const Search = ({searchOnKeyUp}) => {
    return(
        <div id='repos-search' onClick={() => { document.getElementById('repos-search-box').focus() }}>
            <i className="fal fa-search" />
            <input type='text' id='repos-search-box' onKeyUp={searchOnKeyUp} />
        </div>
    );
};

//Add repo button
const Add = ({ loading, toggle, user, name, finishFetch, addToRepos, resetSearch }) => {

    return(
        <div id='repos-add' className='repos-repo' onClick={() => {
            //Attempt to fetch repo from github if the repo is not already loadingRepos
            if(!loading) {
                toggle(true);
                fetch(`https://api.github.com/repos/${user.name}/${name}`)
                .then((response) => response.json())
                .then((data) => {
                    if(data.message) {
                        finishFetch({}, data.message) //Github Error
                    } else {
                        fetch('/api/repo', {
                            method: 'post',
                            credentials: 'same-origin',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                clone_url: data.clone_url,
                                repo_name: data.name
                            })
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            if(data.error) {
                                finishFetch({}, data.error) //DigiCI Error
                            } else {
                                //Rest search
                                let search = document.getElementById('repos-search-box');
                                search.value = '';
                                //Add new repo to local dom
                                finishFetch(data);
                                addToRepos(data);
                                resetSearch();
                            }
                        });
                    }
                });
            }
        }}><i id='repos-add-icon' className='fal fa-plus-circle' /><span>{name}</span></div>
    );
};

//Repo button
const Repo = ({ id, repo_name, history }) => {
    return(
        <div className='repos-repo' onClick={() => { history.push(`/dash/${repo_name}`) }}>
            <span>{repo_name}</span>
        </div>
    )
};

//Repos nav component
class Repos extends Component {

    constructor(props) {
        super(props);
        this.searchOnKeyUp = this.searchOnKeyUp.bind(this);
    }

    searchOnKeyUp() {
        let fuse = new Fuse(this.props.repos, {
            shouldSort: true,
            threshold: 0.3,
            location: 0,
            distance: 50,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                'repo_name'
            ]
        });

        let value = document.getElementById('repos-search-box').value;
        this.props.onKeyDownFilter(value, fuse.search(value))
    }

    componentDidMount() {
        if(!spawned) {
            spawned = true;

            //Fetch repos once
            fetch(`/api/repos.json`, {credentials: 'same-origin'})
            .then((response) => response.json())
            .then((data) => {
                //Parse data correctly based on return
                if(data.length > 1) {
                    this.props.finishReposFetch(data.map((r) => r))
                } else if (data.length = 1) {
                    this.props.finishReposFetch(data)
                } else {
                    this.props.finishReposFetch({})
                }
            });
        }
    }

    componentWillReceiveProps(props) {
        //Font Awesome icon switch fix
        let icon = document.getElementById('repos-add-icon');
        if(icon) {
            if(props.loadingRepo) {
                icon.setAttribute('data-icon', 'circle-notch');
                icon.setAttribute('data-prefix', 'fas');
                icon.classList.add('fa-spin')
            } else if(icon.classList.contains('fa-spin')) {
                if(props.repoError) {
                    icon.setAttribute('data-icon', 'exclamation-circle');
                    icon.setAttribute('data-prefix', 'fal');
                } else {
                    icon.setAttribute('data-icon', 'plus-circle');
                    icon.setAttribute('data-prefix', 'fal');
                }
                icon.classList.remove('fa-spin')
            }
        }
    }

    render() {
        //Add loading styles
        let center = this.props.loadingRepos ? 'flex-center' : '';

        //Generate list of repos for filters or repos themselves
        let repos;
        if(!this.props.filter) {
            repos = this.props.repos.map((r) => { return <Repo
                key={r.id}
                id={r.id}
                repo_name={r.repo_name}
                history={this.props.history} /> });
        } else {
            repos = this.props.filter.results.map((r) => { return <Repo
                key={r.id}
                id={r.id}
                repo_name={r.repo_name}
                history={this.props.history} /> });
        }

        return(
            <div id='repos' className={`flex flex-column ${center}`}>
                {   /* Display loadingRepos screen or search box if repos are loaded */
                    this.props.loadingRepos ? <Loading />: <Search searchOnKeyUp={this.searchOnKeyUp} />
                }

                {   /* Render repos in database */
                    repos
                }

                {   /* Add repo button if its not found in database */
                    this.props.filter && this.props.filter.results.filter((r) => r.repo_name === this.props.filter.string).length === 0 ?
                    <Add name={this.props.filter.string}
                         user={this.props.user}
                         loading={this.props.loadingRepo}
                         toggle={this.props.toggleRepo}
                         finishFetch={this.props.finishRepoFetch}
                         addToRepos={this.props.addToRepos}
                         resetSearch={this.props.onKeyDownFilter}
                    /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loadingRepos: state.repos.isFetching,
    fetched: state.repos.fetched,
    errors: state.repos.errors,
    repos: state.repos.repos,
    filter: state.repos.filter,
    repoError: state.repo.errors,
    loadingRepo: state.repo.isFetching,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    onKeyDownFilter: (str = '', result = []) => dispatch(actions.repos.filter(str === '' ? false : {string: str, results: result})),
    finishReposFetch: (repos) => dispatch(actions.repos.finishReposFetch(repos)),
    finishRepoFetch: (repo = {}, error = false) => dispatch(actions.repo.finishRepoFetch(repo, error)),
    toggleRepo: (loading) => dispatch(actions.repo.toggle(loading)),
    addToRepos: (repo) => dispatch(actions.repos.add(repo))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Repos))