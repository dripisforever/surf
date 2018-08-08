import React, { Component } from 'react';
// import axios from 'axios';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom'
import { createSelector } from 'reselect';

import logo from './styles/logo.svg';
import './styles/App.css';
import Surf from './components/Surf';
import PreviewsPage from './pages/previews-page';
import SignInPage from './pages/signin-page';
import SignUpPage from './pages/signup-page';
import UserPage   from './pages/user-page';
import ProfileEdit from './pages/user-page/profile-edit';
import requireAuth from './requireAuth';
// import FeedPage from './pages/feed-page';
import { getSearch, searchActions } from '../core/search';

export const App = ({handleSearch, search, toggleSearch}) => {
  return (
    <div className="app-container">


      <main className="main">
        <Switch>
          <Route exact path="/"    render={(props) => ( <Surf handleSearch={handleSearch} search={search} /> )}/>
          <Route path="/search"    component={PreviewsPage}/>


          <Route path="/signin"    component={SignInPage}/>
          <Route path="/signup"    component={SignUpPage}/>
          <Route path="/edit"      component={requireAuth(ProfileEdit)}/>
          <Route path="/:username" component={requireAuth(UserPage)}/>
          {/* <Route path="/:url" component={WebPage} /> */}
        </Switch>
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
