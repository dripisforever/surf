/ @flow

import type {
  Dispatch,
  State,
  Suggestion,
} from "../../types";

type AutosuggestStatusPropTypes = {
  isError: boolean;
  isFetching: boolean;
};

type SearchCompanyPropTypes = {
  currentTerm: string;
  isErrorFetchingSuggestions: boolean;
  isFetchingSuggestions: boolean;
  router: any;
  suggestions: any;

  changeSuggestionsCurrentTerm: (newTerm : string) => void;
  fetchCurrentCompanyInfo: (companyID : string) => void;
  fetchSuggestions: (search : string) => void;
  getShouldFetchCurrentCompanyInfo: (rawCompanyID : string) => boolean;
}

// --- end types

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Autosuggest from "react-autosuggest";
import React from "react";

import {
  changeSuggestionsCurrentTerm as changeSuggestionsCurrentTermAction,
  fetchSuggestions as fetchSuggestionsAction,
} from "../../actions/account/suggestions";

import {
  fetchCurrentCompanyInfo as fetchCurrentCompanyInfoAction,
} from "../../actions/company/info";

import {
  getShouldFetchCurrentCompanyInfo as getShouldFetchCurrentCompanyInfoSelector,
} from "../../reducers/company/info";

import {
  getIsErrorFetchingSuggestions,
  getIsFetchingSuggestions,
  getSuggestionsByCurrentTerm,
} from "../../reducers/account/suggestions";

const getSuggestionValue = (currentTerm : string) => () => currentTerm,
  renderSuggestion = (suggestion : Suggestion) => (
    <span>
      <i
        aria-hidden="true"
        className="fa fa-building-o"
      />
      {` ${suggestion.Name}`}
    </span>
  );

const AutosuggestStatus = ({ isError, isFetching } : AutosuggestStatusPropTypes) => {

  const iStyle = {
    position : "absolute",
    right    : 8,
    top      : 12,
  };

  if (isError) {
    return (
      <i
        aria-label="Nu am putut prelua firmele"
        className="fa fa-exclamation-triangle text-warning"
        data-effect="solid"
        data-for="root"
        data-place="bottom"
        data-tip="Nu am putut prelua firmele"
        data-type="warning"
        style={iStyle}
       />
    );
  }

  if (isFetching) {
    return (
      <i className="fa fa-circle-o-notch fa-spin fa-fw" style={iStyle} />
    );
  }

  return null;
};

const mapStateToProps = (state : State) => ({
    // suggestions
    currentTerm                : state.suggestions.currentTerm,
    isErrorFetchingSuggestions : getIsErrorFetchingSuggestions(state),
    isFetchingSuggestions      : getIsFetchingSuggestions(state),
    suggestions                : getSuggestionsByCurrentTerm(state),

    // company
    getShouldFetchCurrentCompanyInfo: getShouldFetchCurrentCompanyInfoSelector(state),
  }),
  mapDispatchToProps = (dispatch : Dispatch) => bindActionCreators({
    fetchSuggestions             : fetchSuggestionsAction,
    changeSuggestionsCurrentTerm : changeSuggestionsCurrentTermAction,

    // company
    fetchCurrentCompanyInfo: fetchCurrentCompanyInfoAction,
  }, dispatch);

class SearchCompany extends React.Component {

  props: SearchCompanyPropTypes;

  onChange: (event: any, something : {newValue : string}) => void;
  handleFetchRequested: (something: {value : string}) => void;
  handleClearRequested: (something: {value : string}) => Array<Suggestion>;

  handleSuggestionSelected: (
    event: any,
    something : {suggestion: Suggestion}
  ) => void;

  constructor (props : SearchCompanyPropTypes) {
    super(props);

    const {
      changeSuggestionsCurrentTerm,
    } = this.props;

    const timeoutDelay = 400;

    let timeoutFetchSuggestions : any = false;

    this.onChange = (event : any, { newValue } : {newValue: string }) => changeSuggestionsCurrentTerm(newValue);

    this.handleFetchRequested = ({ value } : {value : string }) => {

      const {
        fetchSuggestions,
        currentTerm,
      } = this.props;

      const oldValue = (
          String(currentTerm).
          trim().
          toLowerCase()
        ),
        newValue = (
          String(value).
          trim().
          toLowerCase()
        ),
        theNewTermIsDifferent = (
          newValue !== oldValue
        ),
        newValueIsNotEmpty = (newValue !== ""),
        shouldFetchSuggestions = (
          theNewTermIsDifferent &&
          newValueIsNotEmpty
        );

      if (shouldFetchSuggestions) {
        if (timeoutFetchSuggestions) {
          window.clearTimeout(timeoutFetchSuggestions);
        }

        timeoutFetchSuggestions = setTimeout(() => {
          window.clearTimeout(timeoutFetchSuggestions);
          fetchSuggestions(value);
        }, timeoutDelay);
      }
    };

    this.handleClearRequested = () => [];

    this.handleSuggestionSelected = ( event : any, { suggestion } : { suggestion : Suggestion }) => {

      const {
        getShouldFetchCurrentCompanyInfo,
        fetchCurrentCompanyInfo,
        router,
      } = props;

      const companyID = String(suggestion.ID);

      if (getShouldFetchCurrentCompanyInfo(companyID)) {
        fetchCurrentCompanyInfo(companyID);
      }

      router.push(`/company/${companyID}`);
    };
  }

  shouldComponentUpdate (nextProps) {

    const hasSuggestionsChanged = (
        this.props.suggestions !== nextProps.suggestions
      ),
      hasValueChanged = (
        this.props.currentTerm !== nextProps.currentTerm
      ),
      hasFetchingChanged = (
        this.props.isFetchingSuggestions !== nextProps.isFetchingSuggestions
      ),
      hasErrorChanged = (
        this.props.isErrorFetchingSuggestions !== nextProps.isErrorFetchingSuggestions
      );

    return (
      hasSuggestionsChanged ||
      hasValueChanged ||
      hasFetchingChanged ||
      hasErrorChanged
    );
  }

  render () {
    const {
      isErrorFetchingSuggestions,
      isFetchingSuggestions,
      suggestions,
      currentTerm,
    } = this.props;

    const searchCompanyMessage = "Caută firmă...",
      inputProps = {
        "aria-label"      : searchCompanyMessage,
        "aria-labelledby" : searchCompanyMessage,
        "onChange"        : this.onChange,
        "placeholder"     : searchCompanyMessage,
        "tabIndex"        : 0,
        "value"           : currentTerm,
      },
      theme = {
        container            : "special-container",
        input                : "special-search-input form-control",
        suggestion           : "list-group-item suggestion-item",
        suggestionFocused    : "list-group-item active",
        suggestionsContainer : "suggestions-company-container",
      };

    return (
      <div style={{ position: "relative" }}>
        <Autosuggest
          getSuggestionValue={getSuggestionValue(currentTerm)}
          inputProps={inputProps}
          onSuggestionSelected={this.handleSuggestionSelected}
          onSuggestionsClearRequested={this.handleClearRequested}
          onSuggestionsFetchRequested={this.handleFetchRequested}
          renderSuggestion={renderSuggestion}
          suggestions={suggestions}
          theme={theme}
          />
        <AutosuggestStatus
          isError={isErrorFetchingSuggestions}
          isFetching={isFetchingSuggestions}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchCompany)
);
