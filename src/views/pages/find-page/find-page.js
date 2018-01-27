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


import Autosuggest from 'react-autosuggest';

import history from '../../../core/history';
// import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';


const languages = [
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'qazaq',
    year: 1972
  },
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'a',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const getSuggestions = (value) => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

const getSuggestionValue = (suggestion) => {
  return suggestion.name;
}

const renderSuggestion = (suggestion, { query }) => {
  const matches = AutosuggestHighlightMatch(suggestion.name, query);
  const parts = AutosuggestHighlightParse(suggestion.name, matches);

  return (
    <span>
      {parts.map((part, index) => {
        const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );
}


class FindPage extends React.Component {
  static propTypes = {
    loadSearchResults: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      preventHideDropdown: false,
      showDropdown: false,
      term: [],
      posts: [],
      users: [],
      tags: [],
      query: this.props.query,
      value: ''
    }

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
    // this.resetPreventHideDropdown();
    this.setState({ preventHideDropdown: true });
    // this.setState({ preventHideDropdown: false });
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
    // this.setState({ preventHideDropdown: false });
    // this.setState({ showDropdown: false });
    this.props.loadSearchResults(this.props.query);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.query !== this.props.query) {
      // this.setState({ preventHideDropdown: false });
      this.setState({ showDropdown: false });

      this.props.loadSearchResults(nextProps.query);
    }
  }

  handlePageChange(pageNum) {
      this.props.onPageChange(pageNum);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // history.push(`/search?q=${event.target.value}`);
    history.push(`/find?q=${this.state.query}`);
    console.log('handleSubmit called')
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')

    const SPACE_SPLITTER = /\s+/;
    // var query = this.state.query.trim().split(SPACE_SPLITTER).join('+');

    // it'll not send request, if query length less than three letter
    // if (!query || query.length < 0) {
    //     return;
    // }
    // this.input.blur();
    // this.props.handleSearch(query);
  }

  handleQueryChange(term) {
    this.setState({query: term});


      this.search(term);
      this.setState({query: term});

  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    this.handleQueryChange(event.target.value)
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
    this.search(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleSuggestionSelected = (event, {suggestion, enter}) => {
    // event.preventDefault();
    history.push(`/find?q=${suggestion.name}`);
  }


  render() {
    const logoUrl = require(`../../images/black-views-logo.png`);
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      autoFocus: false,
      placeholder: 'Type a programming language',
      value: this.state.query,
      onChange: this.onChange
    };
    return (
      <div className="search__results-page container">

        <div className="views__logo container">
          <Link to="/" className="Header__logo"><img className="Logo" src={logoUrl} alt="img"/></Link>
        </div>


        <div className="salam row">

           <div className="searchBar">

             <form onSubmit={this.handleSubmit}>
               <Autosuggest
                 suggestions={suggestions}
                 onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                 onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                 getSuggestionValue={getSuggestionValue}
                 focusFirstSuggestion={true}
                 renderSuggestion={renderSuggestion}
                 onSuggestionSelected={this.handleSuggestionSelected}
                 inputProps={inputProps}
               />
             </form>
             {/* {this.renderSearchResults()} */}
           </div>

           <Tracklist />

           <div className="pagination"><Pagination/></div>
        </div>

       </div>

    );
  }


}

const mapStateToProps = (state, props) => {
  return {
    query: new URLSearchParams(window.location.search).get('q'),
    urls: props.location.search.q
  };
};

const mapDispatchToProps = {
  loadSearchResults: searchActions.loadSearchResults,
  handleSearch: searchActions.navigateToSearch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPage);
