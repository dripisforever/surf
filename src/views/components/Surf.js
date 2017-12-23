import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Icon from '../icon';
// import IconButton from '../icon-button';
import SurfBar from './SurfBar';
import SurfResultsList from './surf-autocomplete/SurfResultsList';
// import './app-header.css';
import {API_MOVIES_URL} from '../../core/constants';
import '../styles/SurfBar.css';
class Surf extends React.Component {
  constructor(props) {
    super(props)

    this.state = { preventHideDropdown: false, showDropdown: false, term: [], posts: [], users: [], tags: [] }
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);
  }

  search(term) {
    if (!term || term.length <= 0) {
        return;
    }
    this.setState({ term });
    return axios({
      method: 'GET',
      url: `${API_MOVIES_URL}?q=${term}`
      // url: `${API_URL}/users/search?q=${term}`
    })
    .then(({data}) => {
      this.setState({
        users: data.users,
        website: data.websites
      });
    });
  }

  setPreventHideDropdown() {
    this.setState({ preventHideDropdown: true });
  }

  resetPreventHideDropdown() {
    this.setState({ preventHideDropdown: false });
  }

  hideDropdown() {
    if (!this.state.preventHideDropdown) {
      this.setState({ showDropdown: false });
    }
  }

  showDropdown() {
    this.setState({ showDropdown: true });
  }

  render() {
    const { handleSearch, search } = this.props;
    const logoUrl = require(`../images/black-views-logo.png`);
    return (
      <div className="sypher">
        <div className="surf-search__main">
          <Link to="/feed" className="Header__logo-link"><img className="SALAM" src={logoUrl} alt="img"/></Link>
        </div>
        <SurfBar
          handleSearch={handleSearch}
          search={search}
          onSearchTermChange={(term) => {this.search(term)}}
          showDropdown={this.showDropdown}
          hideDropdown={this.hideDropdown}
          term={this.state.term}
        />
        {this.renderSearchResults()}
      </div>
    )
  }

  renderSearchResults() {
    // if (!query || query.length < 0) {
    //     return;
    // }
    if(!this.state.showDropdown ||  this.state.users.length === 0 ) {
      return;
    }

    return (
      <SurfResultsList
        setPreventHideDropdown={this.setPreventHideDropdown}
        resetPreventHideDropdown={this.resetPreventHideDropdown}
        term={this.state.term}
        users={this.state.users}
      />
    );
  }

}

Surf.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};
export default Surf;
