// import Pagination from './Pagination';
// import MovieBox from './MovieBox';
// import SearchResults from './SearchResults';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { searchActions } from '../../../core/search';
import Tracklist from '../../components/Tracklist';
import SearchBar from '../../components/SearchBar';
import SearchResultsList from '../../components/search-autocomplete/SearchResultsList';
// import Page from '../../components/pagination/Page';
import Pagination from '../../components/pagination/Pagination';

import '../../styles/SearchPage.css';
import {API_MOVIES_URL} from '../../../core/constants';
// import '../styles/TrackCard.css';
class SearchPage extends React.Component {
  static propTypes = {
    loadSearchResults: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { preventHideDropdown: false, showDropdown: false, term: [], posts: [], users: [], tags: [] }
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);

    this.handlePageChange = this.handlePageChange.bind(this);
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
  componentWillMount() {
    this.props.loadSearchResults(this.props.query);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.props.loadSearchResults(nextProps.query);
    }
  }

  handlePageChange(pageNum) {
      this.props.onPageChange(pageNum);
  }

  render() {
    const logoUrl = require(`../../images/black-views-logo.png`);
    return (
      <div className="search__results-page container">

        <div className="views__logo container">
          <Link to="/" className="Header__logo"><img className="Logo" src={logoUrl} alt="img"/></Link>
        </div>


        <div className="salam row">

           <div className="searchBar">

             <SearchBar
               handleSearch={this.props.handleSearch}
               query={this.props.query}
               onSearchTermChange={(term) => {this.search(term)}}
               showDropdown={this.showDropdown}
               hideDropdown={this.hideDropdown}
               term={this.state.term}
             />
             {this.renderSearchResults()}
           </div>

           <Tracklist />

           <div className="pagination"><Pagination/></div>
        </div>

       </div>

    );
  }

  renderSearchResults() {
    // if (!query || query.length < 0) {
    //     return;
    // }
    if(!this.state.showDropdown ||  this.state.users.length === 0 ) {
      return;
    }

    return (
      <SearchResultsList
        setPreventHideDropdown={this.setPreventHideDropdown}
        resetPreventHideDropdown={this.resetPreventHideDropdown}
        term={this.state.term}
        users={this.state.users}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    query: new URLSearchParams(props.location.search).get('q')
  };
};

const mapDispatchToProps = {
  loadSearchResults: searchActions.loadSearchResults,
  handleSearch: searchActions.navigateToSearch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
