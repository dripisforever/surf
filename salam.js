var SearchResults = React.createClass({
           handlePageChange: function(pageNum) {
               this.props.onPageChange(pageNum);
           },
           render: function() {
               var movies = [];

               this.props.data.results.forEach(function(movie) {
                   movies.push(<MovieBox movie={movie} key={movie.id}/>);
               });

               return (
                  <div>
                  <h3>Search results ({this.props.data.total_results} found)</h3>
                  <Pagination onPageClick={this.handlePageChange} currentPage={this.props.data.page} totalPages={this.props.data.total_pages} totalResults={this.props.data.total_results}/>
                  <div>{movies}</div>
                  </div>
               );
           }
       });

var SearchBar = React.createClass({
           getInitialState: function() {
               return {query: ''};
           },
           handleQueryChange: function(e) {
               this.setState({query: e.target.value});
           },
           handleSubmit: function(e) {
               e.preventDefault();
               var query = this.state.query.trim();
               if (!query || query.length < 3) {
                   return;
               }
               this.props.onSearch(query);
           },
           render: function() {
               return (
                  <form className="searchForm" onSubmit={this.handleSubmit}>
                   <input
                       type="text"
                       name="query"
                       placeholder="Search for a movie..."
                       value={this.state.query}
                       onChange={this.handleQueryChange}
                   />
                   <input type="submit" value="Search Movie"/>
                  </form>
               );
           }
       });

var MovieBox = React.createClass({
           render: function() {
               var m = this.props.movie;
               return (
                  <div className="movieBox">
                       <div>{m.original_title} ({m.release_date})</div>
                  </div>
               );
           }
       });

var Pagination = React.createClass({
           render: function() {
               var pages = [];
               var total = this.props.totalPages;
               for (var i = 1; i <= total; i++) {
                   pages.push(<Page key={i} onPageClick={this.props.onPageClick} pageNum={i} active={(this.props.currentPage == i) || false}/>);
               }
               return (
                   <div className="pagination">{pages}</div>
               );
           }
       });

var Page = React.createClass({
           handleClick: function(e) {
               var pageNum = e.target.innerHTML;
               this.props.onPageClick(pageNum);
           },
           render: function() {
               return (
                   <a href="#" onClick={this.handleClick} className={this.props.active ? 'active' : ''}>{this.props.pageNum}</a>
               )
           }
       });

var MovieSearchPage = React.createClass({
           getInitialState: function() {
               return {query: '', pageNum: 1, data: {results: [], total_pages: 0, total_results: 0}};
           },
           initSearch: function(query) {
               this.setState({query: query});
               this.doSearch(query, this.state.pageNum);
           },
           nextPage: function(pageNum) {
               this.setState({pageNum: pageNum});
               this.doSearch(this.state.query, pageNum);
           },
           doSearch: function(query, pageNum) {
               $.ajax({
                   url: this.props.url,
                   dataType : 'json',
                   type: 'POST',
                   data: {query: query, api_key: this.props.apiKey, page: pageNum},
                   success: function(data) {
                       this.setState({data: data});
                   }.bind(this),
                   error: function(xhr, status, err) {
                       console.error(this.props.url, status, err.toString());
                   }.bind(this)
               });
           },
           render: function() {
               return (
                   <div>
                       <SearchBar onSearch={this.initSearch}/>
                       <SearchResults onPageChange={this.nextPage} data={this.state.data}/>
                   </div>
               );
           }
       });

ReactDOM.render(
    <MovieSearchPage url="http://api.themoviedb.org/3/search/movie" apiKey=""/>,
   document.getElementById('container'));
