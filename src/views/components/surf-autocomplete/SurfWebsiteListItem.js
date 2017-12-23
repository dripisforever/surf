
import React from 'react';
// import { getAvatarUrl } from '../utils/helpers';
class SurfWebsiteListItem extends React.Component {
  render() {
    return (
      <li>
        <a href={this.props.website.url}>
          {/* <div className="avatar-image" style={{backgroundImage: `url(${getAvatarUrl(this.props.user.avatarUrl)})`, backgroundSize: 'cover'}}> */}
            {/* <img width="35" className="avatar-image" src={getAvatarUrl(this.props.user.avatarUrl)} alt={`${this.props.user.username} avatar`} /> */}
          {/* </div> */}
          <span dangerouslySetInnerHTML={{ __html: this.props.user.username }} />
        </a>
      </li>
    );
  }
}
export default SurfWebsiteListItem;
