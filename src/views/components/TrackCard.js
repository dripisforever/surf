import React from 'react';
import { Link } from 'react-router-dom';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Track } from '../../core/tracks';
import '../styles/TrackCard.css';

export class TrackCard extends React.Component {
  static propTypes = {
    track: PropTypes.instanceOf(Track).isRequired
  };

  render() {
    const {track} = this.props
    return (
      <div className="track-block">
        {/* <div className="track-card__username">
          <Link to={`/users/${track.userId}/tracks`}>{track.username}</Link>
        </div> */}

        {/* <h1 className="track-card__title">{track.title}</h1> */}
        <div className="track-card__title"><span className="bra">{track.username}</span></div>
        <div className="track-card__url">www.views.ly/{track.username}</div>
      </div>

    );
  }
}
export default TrackCard;
