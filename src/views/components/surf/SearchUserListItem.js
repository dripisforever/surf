import React from 'react';
import history from '../../../core/history';
// import { getAvatarUrl } from '../utils/helpers';
class SearchUserListItem extends React.Component {
  navigate(e) {

  }
  render() {
    return (
      <li onClick={() => history.push(`search?q=${this.props.user.username}`)}>
        <a href={`/search?q=${this.props.user.username}`}>
          {/* <div className="avatar-image" style={{backgroundImage: `url(${getAvatarUrl(this.props.user.avatarUrl)})`, backgroundSize: 'cover'}}> */}
            {/* <img width="35" className="avatar-image" src={getAvatarUrl(this.props.user.avatarUrl)} alt={`${this.props.user.username} avatar`} /> */}
          {/* </div> */}
          <span dangerouslySetInnerHTML={{ __html: this.props.user.username }} />
        </a>
      </li>
    );
  }
}
export default SearchUserListItem;
