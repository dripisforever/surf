import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import SearchResults from './SearchResults';
import '../styles/SurfBar.css';

import { push } from 'react-router-redux';
class SurfBar extends React.Component {
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
  componentDidMount() {
    this.input.focus();
  }
  handleQueryChange(term) {
      this.setState({query: term});


      if (!this.input.value || this.input.value.length < 0) {
          return;
      } else {
        this.props.onSearchTermChange(term);
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
    this.props.handleSearch(query);
  }



  render() {
      return (
        <div className="six columns offset-by-three root-surfBar">
         <form className="searchForm" onSubmit={this.handleSubmit} noValidate>
          <input
              className="woah"
              onFocus={() => this.props.showDropdown()}
              onBlur={() => this.props.hideDropdown()}
              autoComplete="off"
              type="text"
              name="query"
              ref={e => this.input = e}
              // placeholder="Surf..."
              value={this.state.query}
              onChange={event => this.handleQueryChange(event.target.value)}
          />

         </form>

       </div>
      );
  }
}

export default SurfBar;
