import React, { Component } from 'react';
import axios from 'axios';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { createSelector } from 'reselect';

import logo from './styles/logo.svg';
import './styles/App.css';
import Surf from './components/Surf';
// import Surfbar from './components/SurfBar';
import SearchPage from './components/SearchPage';
import { getSearch, searchActions } from '../core/search';




export function App({handleSearch, search, toggleSearch}) {
  return (
    <div className="app-container">


      <main className="main">
        {/* <Route exact path="/" render={(props) => ( <Surfbar handleSearch={handleSearch} search={search} /> )} /> */}
        <Route exact path="/" render={(props) => ( <Surf handleSearch={handleSearch} search={search} /> )} />
        {/* <Route exact path="/" component={Surf}/> */}
        <Route path="/search" component={SearchPage}/>
      </main>

    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  toggleSearch: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getSearch,
  search => ({
    search: search.toJS()
  })
);

const mapDispatchToProps = {
  loadSearchResults: searchActions.loadSearchResults,
  handleSearch: searchActions.navigateToSearch,
  toggleSearch: searchActions.toggleSearchField
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
