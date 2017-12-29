import React from 'react';
import SearchUserListItem from './SearchUserListItem';
import SearchWebsiteListItem from './SearchWebsiteListItem';
import '../../styles/SearchResultsList.css';
class SearchResultsList extends React.Component {

  render() {
    return (
      <div className="alo-dropdown-menu" id="alo-autocomplete-items"
        onMouseEnter={() => {this.props.setPreventHideDropdown()}}
        onMouseLeave={() => {this.props.resetPreventHideDropdown()}}
        >
        {/* <span className="dropdown-arrow-top"></span>
        <span className="dropdown-arrow-bottom"></span>
        <li className="Salam">
          <a href={`/search?q=${this.props.term}`}>
            <i className="fa fa-search"></i> Search for <strong>{this.props.term}</strong>
          </a>
        </li> */}

        {/* {this.renderUserHeading()} */}
        {this.renderUsers()}
        {/* {this.renderWebsites()} */}

      </div>
    );
  }

  renderUsers() {
    return this.props.users.slice(0, 10).map((user) => {
      return <SearchUserListItem key={user.id} user={user} />
    });
  }

  // renderWebsites() {
  //   return this.props.websites.slice(0.3).map((user) => {
  //     return <SearchWebsiteListItem key={website.id} website={website} />
  //   })
  // }



  renderUserHeading() {
    if (this.props.users.length === 0) { return; }

    return <li className="autocomplete-heading"><h4>People</h4></li>
  }


}

export default SearchResultsList;
