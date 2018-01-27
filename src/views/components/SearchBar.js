import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import SearchResults from './SearchResults';
import '../styles/search.css';
import queryString from 'query-string';

import { push } from 'react-router-redux';
class SearchBar extends React.Component {
    // static contextTypes = {
    //   router: PropTypes.func.isRequired,
    // };

  static propTypes = {
    handleSearch: PropTypes.func.isRequired
  };

  constructor() {
    super(...arguments);

    this.state = {
      query: this.props.query,
      // query: '',
      now: '',
      pageNum: 1,
      data: {
        results: [],
        total_pages: 0,
        total_results: 0
      }
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // componentWillMount(props) {
  //   this.setState({ now: queryString.parse(props.location.search).q || '' })
  // }

  // componentWillUpdate(nextProps) {
    // if (nextProps.query !== this.props.query) {
      // this.setState({ preventHideDropdown: false });
      // this.setState({ showDropdown: false });
      // this.hideDropdown();
      // this.props.loadSearchResults(nextProps.query);
    // }
  // }

  componentDidMount() {
    this.props.hideDropdown();
  }
  componentWillUpdate(nextProps, nextState) {
    // this.props.hideDropdown();
  }

  handleQueryChange(e) {
      this.setState({query: e.target.value});
      // document.getElementById("myURL").value = this.props.slon;
      // this.setState({query: this.props.location.search.get('q') })
      if (!this.input.value || this.input.value.length < 0) {
          return;
      } else {
        this.props.onSearchTermChange(e.target.value);
      }
  }

  handleSubmit(e) {
    e.preventDefault();
    const SPACE_SPLITTER = /\s+/;
    var query = this.state.query.trim().split(SPACE_SPLITTER).join('+');

    // it'll not send request, if query length less than three letter
    if (!query || query.length < 0) {
        return;
    }
    this.input.blur();
    this.input.value = query
    this.props.handleSearch(query);
  }



  render() {
      return (
        <div className="root-searchBar">
         <form className="searchForm" onSubmit={this.handleSubmit} >
          <input
            id="myUrl"
            onFocus={() => this.props.showDropdown()}
            onBlur={() => this.props.hideDropdown()}
              autoComplete="off"
              type="text"
              name="query"
              ref={e => this.input = e}
              // placeholder="Search for a movie..."
              value={this.state.query}
              onChange={this.handleQueryChange}
              // onClick={this.handleSearch}
          />
          {/* <input type="submit" value="Search" onClick={this.handleSearch} /> */}
         </form>

       </div>
      );
  }
}
const mapStateToProps = (state, props) => {
  return {
    // wow: state.query
    slon: new URLSearchParams(window.location.search).get('q')
  };
};

// export default SearchBar;
export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(SearchBar);
