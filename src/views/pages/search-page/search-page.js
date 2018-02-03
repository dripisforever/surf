// import Pagination from './Pagination';
// import MovieBox from './MovieBox';
// import SearchResults from './SearchResults';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { searchActions } from '../../../core/search';
import Tracklist from '../../components/Tracklist';
import SearchBar from '../../components/SearchBar';
import SearchResultsList from '../../components/search-autocomplete/SearchResultsList';
// import Page from '../../components/pagination/Page';
import Pagination from '../../components/pagination/Pagination';
// import history from '../../../core/history';
// import history from '../../../core/his';
import history from '../../../core/hist';
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

    this.state = {
      preventHideDropdown: false,
      showDropdown: false,
      term: [],
      posts: [],
      users: [],
      tags: [],
      pageCount: 100,
      currentPage: ''
    }
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.linkBuilder = this.linkBuilder.bind(this);
  }
  linkBuilder(page){
    // const jetski = history.push('page'+page)
    return (
      `search?q=${this.props.query}&page=${page}`
    );
    // return (
    //   'page' + page
    //
    // );
  }
  // componentDidMount() {
    // window.scrollTo(0,0);
  // }
  // componentWillUpdate() {
    // window.scrollTo(0,0);
  // }
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
        // pageCount: Math.ceil(data.hits.total/10),
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

  searchWithPagination(term, page){
    if (!term || term.length <= 0) {
        return;
    }
    this.setState({ term, page });
    return axios({
      method: 'GET',
      // data: {limit: 10, offset: this.state.offset},
      url: `${API_MOVIES_URL}?q=${term}&page=${page}`
      // url: `${API_URL}/users/search?q=${term}`
    })
    .then(({data}) => {
      this.setState({
        users: data.users,
        // pageCount: Math.ceil(data.hits.total/10),
        website: data.websites
      });
    });
  }

  handlePageClick = (page) => {
    window.scrollTo(0,0) ;
    let selected = page.selected+1;
    let offset = Math.ceil(selected * this.props.perPage);
    history.push(`search?q=${this.props.query}&page=${selected}`);
    // this.setState({offset: offset});
    this.searchWithPagination(this.props.query, selected);


  };

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

           <div className="pagination-des">
             <ReactPaginate previousLabel={"previous"}
                            pageClassName={"demski"}
                            // initialPage={0}
                            nextLabel={"next"}
                            breakLabel={<a href="/">...</a>}
                            breakClassName={"woeski"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={9}
                            containerClassName={"jetski"}
                            subContainerClassName={"demski"}
                            onPageChange={this.handlePageClick}
                            // hrefBuilder={this.linkBuilder}
                            // onPageChange={(page) => history.push(`search?q=${this.props.query}&page=${page.selected+1}`)}
                            // hrefBuilder={(page) => `search?q=${this.props.query}&page=${page}`}
                            // activeClassName={""}
              />
           </div>
        </div>
       </div>
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
