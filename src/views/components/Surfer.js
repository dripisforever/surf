import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SurfBar from './SurfBar';
import SurfResultsList from './surf-autocomplete/SurfResultsList';
import {API_MOVIES_URL} from '../../core/constants';
import '../styles/SurfBar.css';

import history from '../../core/history';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

const languages = [
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

// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;
//
//   return inputLength === 0 ? [] : languages.filter(lang =>
//     lang.name.toLowerCase().slice(0, 1) === inputValue
//   );
// };

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

class Surfer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
      preventHideDropdown: false,
      showDropdown: false,
      term: [],
      posts: [],
      users: [],
      tags: [],
      query: [],
      value: ''
    }
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

  handleQueryChange(term) {
    this.setState({query: term});


      this.search(term);
      this.setState({query: term});

  }

  onChange = (event, { newValue, enter }) => {
    this.setState({
      value: newValue
    });
    this.handleQueryChange(event.target.value)
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
    // this.search(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleSuggestionSelected = (event, {suggestion, enter}) => {
    event.preventDefault();
    history.push(`/find?q=${suggestion.name}`);
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

  // componentDidMount() {
  //   this.input.focus();
  // }
  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      autoFocus: true,
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    const { handleSearch, search } = this.props;
    const logoUrl = require(`../images/black-views-logo.png`);
    return (
      <div className="sypher container">
        <div className="six columns offset-by-three surf-search__main">
          <Link to="/" className="Header__logo-link"><img className="SALAM" src={logoUrl} alt="img"/></Link>
        </div>
        {/* <SurfBar
          handleSearch={handleSearch}
          search={search}
          onSearchTermChange={(term) => {this.search(term)}}
          showDropdown={this.showDropdown}
          hideDropdown={this.hideDropdown}
          term={this.state.term}
        /> */}
      <form onSubmit={this.handleSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={this.handleSuggestionSelected}
          inputProps={inputProps}
        />
      </form>
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

Surfer.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};
export default Surfer;
