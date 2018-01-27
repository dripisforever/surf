import React from 'react';
import history from '../../../core/history';
// import { getAvatarUrl } from '../utils/helpers';
class SearchUserListItem extends React.Component {
  constructor(props) {
    super();

    this.state = { query: '', preventHideDropdown: false, showDropdown: false, term: [], posts: [], users: [], tags: [] }
    // this.hideDropdown = this.hideDropdown.bind(this);
    // this.showDropdown = this.showDropdown.bind(this);
    // this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    // this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);

    // this.handlePageChange = this.handlePageChange.bind(this);

    this.navigate = this.navigate.bind(this);
    // this.baseState = this.state
  }

  navigate() {
    // e.preventDefault();
    // this.resetPreventHideDropdown();
    // this.hideDropdown();
    // this.setState(this.baseState)
    // this.props.hideDrop
    // this.setState({query: this.input.valu})
    this.forceUpdate();
    history.push(`/search?q=${this.props.user.username}`);
    this.forceUpdate();
    // history.push(`/search?q=${this.props.user.username}`);

    // this.setState({ preventHideDropdown: true });
  }
  render() {
    return (
      // <li onClick={() => history.push(`search?q=${this.props.user.username}`)}>
        <li href={`/search?q=${this.props.user.username}`} onClick={this.navigate} >
         {/* <a className="val" href={`/search?q=${this.props.user.username}`}> */}
          {/* <div className="avatar-image" style={{backgroundImage: `url(${getAvatarUrl(this.props.user.avatarUrl)})`, backgroundSize: 'cover'}}> */}
            {/* <img width="35" className="avatar-image" src={getAvatarUrl(this.props.user.avatarUrl)} alt={`${this.props.user.username} avatar`} /> */}
          {/* </div> */}
          <span className="value" dangerouslySetInnerHTML={{ __html: this.props.user.username }} />
         {/* </a> */}
        </li>
    );
  }
}
export default SearchUserListItem;
