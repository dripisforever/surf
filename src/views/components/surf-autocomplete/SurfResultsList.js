import React from 'react';
import SurfUserListItem from './SurfUserListItem';
import SurfWebsiteListItem from './SurfWebsiteListItem';
import '../../styles/SurfResultsList.css';
class SurfResultsList extends React.Component {

  render() {
    return (
      <ul className="six columns offset-by-three dropdown-menu" id="autocomplete-items"
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

      </ul>
    );
  }

  renderUsers() {
    return this.props.queries.slice(0, 10).map((query) => {
      return <SurfUserListItem key={query.id} query={query} />
    });
  }

  // renderWebsites() {
  //   return this.props.websites.slice(0.3).map((user) => {
  //     return <SearchWebsiteListItem key={website.id} website={website} />
  //   })
  // }



  renderUserHeading() {
    if (this.props.queries.length === 0) { return; }

    return <li className="autocomplete-heading"><h4>People</h4></li>
  }


}

export default SurfResultsList;
