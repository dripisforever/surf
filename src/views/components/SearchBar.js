import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import SearchResults from './SearchResults';

import { push } from 'react-router-redux';
class SearchBar extends React.Component {
    // static contextTypes = {
    //   router: PropTypes.func.isRequired,
    // };

    static propTypes = {
      handleSearch: PropTypes.func.isRequired,
      search: PropTypes.object.isRequired
    };


    constructor() {
      super(...arguments);

      this.state =  {query: '', pageNum: 1, data: {results: [], total_pages: 0, total_results: 0}};
      this.handleQueryChange = this.handleQueryChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleQueryChange(e) {
        this.setState({query: e.target.value});
    }

    // doSearch = (query) => {
    //   return axios({
    //     method: 'GET',
    //     url: `http://api.themoviedb.org/3/search/movie?query=${query}&api_key=b6cd56bf94f8f8f33f48689d00174b5b`
    //     // url: `${API_URL}/users/search?q=${term}`
    //   })
    //   .then(({data}) => {
    //     this.setState({
    //       data: data
    //     });
    //   });
    // }

    handleSubmit(e) {
        e.preventDefault();
        var query = this.state.query.trim();
        if (!query || query.length < 3) {
            return;
        }
        this.props.handleSearch(query);
        // this.doSearch(query);
        // this.context.router.history.push({
        //   pathname: `/search?q=${query}`,
        //   state: {data: this.state.data}
        // });
    }



    render() {
        return (
          <div>
           <form className="searchForm" onSubmit={this.handleSubmit}>
            <input
                autoComplete="off"
                type="text"
                name="query"
                placeholder="Search for a movie..."
                value={this.state.query}
                onChange={this.handleQueryChange}
            />

           </form>

         </div>
        );
    }
}

export default SearchBar;
