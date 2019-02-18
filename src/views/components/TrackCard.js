import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Track } from '../../core/tracks';
import LikeButton from './LikeButton';
import '../styles/TrackCard.css';
import Previews from './Previews';
import history from '../../core/history';
import { likeTrackAction, unlikeTrackAction } from '../../core/tracklists/actions';

export class TrackCard extends React.Component {
  static propTypes = {
    track: PropTypes.instanceOf(Track).isRequired
  };

  render() {
    const vuseUrl = require(`./../images/heartbreak-mascot-black.png`);
    const { track, handleLikePhoto, handleUnLikePhoto } = this.props;

    let button = null;

    return (
      <div className="track-block">
        <div className="track-card__title">
          <a className="track-card__title-link" href={`https://views.dat/${track.url}`}>
          <span className="bra">{track.title}</span>
            {this.renderTitle}
          </a>
          {button}
        </div>

        <div className="track-card__url">
          {track.url.trim().split(/\s+/).join('-')}
        </div>

        <div className="track-previews">
          <div className="pre-Views" style={{width: `100%`, background: `#ddd`}}>
            <div className="positive-Views" style={{width: `50%`, background: `#676abb`}}>
            </div>
            <span className="tooltiptext">1979/30</span>
          </div>
        </div>

        <div className="track-card__body">
          <div className="hover-me">
            {this.renderPreVIEWS()}
          </div>
        </div>


        <LikeButton
          likedByUser={track.likedByUser}
          liked={track.liked}
          disliked={track.disliked}
          track={this.props.track}
          onClick={() => track.liked ? handleUnLikePhoto(track.id) : handleLikePhoto(track.id)}
        />
        
      </div>

    );
  };

  renderPreviews () {
    return this.props.highlight.body.map((preview) => {
      return <Previews snippet={preview} />
    });
  };

  renderPreVIEWS () {
    let previews = this.props.highlight.body;
    if (this.props.highlight.body) {
      return (
        <div>
          <span dangerouslySetInnerHTML={{ __html: `${previews.join("...<br />")}`}} />
        </div>
      );
    }
  };
}
export default connect(
  null,
  {
    handleLikePhoto: likeTrackAction,
    handleUnLikePhoto: unlikeTrackAction
    // onPush: push,
  }
)(TrackCard);
// export default TrackCard;
