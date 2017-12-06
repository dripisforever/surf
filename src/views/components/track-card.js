import React from 'react';
import { Link } from 'react-router-dom';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Track } from '../../core/tracks';

export class TrackCard extends React.Component {
  static propTypes = {
    track: PropTypes.instanceOf(Track).isRequired
  };

  render() {
    const {track} = this.props
    return (
      <div>
        <div className="track-card__username">
          <Link to={`/users/${track.userId}/tracks`}>{track.username}</Link>
        </div>

        <h1 className="track-card__title">{track.title}</h1>
      </div>

    );
  }
}
export default TrackCard;
