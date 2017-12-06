import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
// import classNames from 'classnames';
import { List } from 'immutable';
import PropTypes from 'prop-types';
// import { getBrowserMedia, infiniteScroll } from 'src/core/browser';
// import { audio, getPlayerIsPlaying, getPlayerTrackId, playerActions } from 'src/core/player';
import { getCurrentTracklist, getTracksForCurrentTracklist, tracklistActions } from '../../core/tracklists';

// import LoadingIndicator from '../loading-indicator';
import TrackCard from './track-card';

// import './tracklist.css';


export class Tracklist extends React.Component {
  static propTypes = {
    tracklistId: PropTypes.string.isRequired,
    tracks: PropTypes.instanceOf(List).isRequired
  };

  renderTrackCards() {
    return this.props.tracks.map((track, index) => {
      return <TrackCard key={index} track={track} />;
    });
  }

  render() {





    return (
      // <div className="woess">
      //
      // </div>

      <div>
        <div>{this.renderTrackCards()}</div>
        <div>{this.props.isPending ? <h1>LOADING RESULTS</h1> : null}</div>
        {this.props.hasNextPage ? this.renderPaginationButton() : null}
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getTracksForCurrentTracklist,
  tracks => ({
    tracks
  })
);

const mapDispatchToProps = {
  loadNextTracks: tracklistActions.loadNextTracks
  // selectTrack: playerActions.playSelectedTrack
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracklist);
