import React from 'react';
import history from '../../../core/history';
// import { getAvatarUrl } from '../utils/helpers';
class SearchUserListItem extends React.Component {
  constructor(props) {
    super();
    this.navigate = this.navigate.bind(this);
    this.baseState = this.state
  }

  navigate() {
    history.push(`search?q=${this.props.user.name}`);
    this.setState(this.baseState)
  }
  render() {
    return (
      // <li onClick={() => history.push(`search?q=${this.props.user.username}`)}>
      // <li href={`/search?q=${this.props.user.username}`} onClick={this.navigate} >
        <a className="val" href={`/search?q=${this.props.user.name}`}>
          {/* <div className="avatar-image" style={{backgroundImage: `url(${getAvatarUrl(this.props.user.avatarUrl)})`, backgroundSize: 'cover'}}> */}
            {/* <img width="35" className="avatar-image" src={getAvatarUrl(this.props.user.avatarUrl)} alt={`${this.props.user.username} avatar`} /> */}
          {/* </div> */}
          <span className="value" dangerouslySetInnerHTML={{ __html: this.props.user.name }} />
        </a>
      // </li>
    );
  }
}
export default SearchUserListItem;
