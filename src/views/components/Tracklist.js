import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { getCurrentTracklist, getTracksForCurrentTracklist, tracklistActions } from '../../core/tracklists';
import { likeTrackAction } from '../../core/tracklists/actions';
import TrackCard from './TrackCard';

export class Tracklist extends React.Component {
  static propTypes = {
    tracks: PropTypes.instanceOf(List).isRequired
  };

  renderTrackCards() {
    return this.props.tracks.map((track) => {
      // return <TrackCard key={track.id} track={track} body={track.body} onClick={this.props.likeTrackAction} highlight={track.highlight} />;
      return <TrackCard key={track.id} track={track} body={track.body} highlight={track.highlight} />;
    });
  }

  render() {
    return (
      <div className="Results">
        {this.renderTrackCards()}
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
  getCurrentTracklist,
  getTracksForCurrentTracklist,
  (tracklist, tracks) => ({
    isPending: tracklist.isPending,
    tracks
  })
);

const mapDispatchToProps = {
  loadNextTracks: tracklistActions.loadNextTracks,
  likeTrackAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracklist);
