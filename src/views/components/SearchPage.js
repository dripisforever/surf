// import Pagination from './Pagination';
// import MovieBox from './MovieBox';
// import SearchResults from './SearchResults';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchActions } from '../../core/search';
import React from 'react';
import Tracklist from './Tracklist';

class SearchPage extends React.Component {
    static propTypes = {
      loadSearchResults: PropTypes.func.isRequired,
      query: PropTypes.string.isRequired
    };

    constructor(props) {
      super(props);

      this.handlePageChange = this.handlePageChange.bind(this);
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
      return (
         <div className="salam">
           <Tracklist />
         </div>
      );
    }
}

const mapStateToProps =  (state, props) => {
  return {
    query: new URLSearchParams(props.location.search).get('q')
  };
};

const mapDispatchToProps = {
  loadSearchResults: searchActions.loadSearchResults
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
