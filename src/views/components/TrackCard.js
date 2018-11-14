import React from 'react';
import { Link } from 'react-router-dom';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Track } from '../../core/tracks';
import LikeButton from './LikeButton';
import '../styles/TrackCard.css';
import history from '../../core/history';
import Previews from './Previews';

export class TrackCard extends React.Component {
  static propTypes = {
    track: PropTypes.instanceOf(Track).isRequired
  };

  render() {
    const vuseUrl = require(`./../images/heartbreak-mascot-black.png`);
    const { track } = this.props;
    let button = null;
    // let liked = null;
    // let disliked = null;
    // let preview = null;

    // if (track.highlight.body.length>0) {
    //   preview = <div className="preView" dangerouslySetInnerHTML={{__html: `${track.highlight.body["0"]}... \n ${track.highlight.body["1"]}... ${track.highlight.body["2"]} `  }} />
    // }else if (track.highlight.length === undefined) {
    //   preview = <div  className="preView" dangerouslySetInnerHTML={{__html: `broski` }} />
    // }

    // if (!track.liked && !track.disliked) {
    //   // button = <div className="default">default</div>;
    //   button = <img src={vuseUrl} className="LikeButton__icon LikeButton__icon--liked"/>
    // } else if (track.liked) {
    //   button = <div className="liked">liked</div>
    // } else if (track.disliked) {
    //   button = <img src={vuseUrl} className="LikeButton__icon LikeButton__icon--liked"/>
    // }

    return (
      <div className="track-block">
        <div className="track-card__title">
          <a className="track-card__title-link" href={`https://views.dat/${track.url}`}>
          <span className="bra">{track.title}</span>
          {this.renderTitle}
          {/* <span>{website.title}</span> */}
          </a>
          {button}
        </div>

        {/* <div className="track-card__url"> */}
          {/* views.ly/{track.title.trim().split(/\s+/).join('-')} */}
        {/* </div> */}

        <div className="track-card__url">
          {track.url.trim().split(/\s+/).join('-')}
        </div>

        <div className="track-previews">
          {/* <div className="pre-Views" style={{width: `100%`, background: `#d9317a`}}> */}
          <div className="pre-Views" style={{width: `100%`, background: `#ddd`}}>
            <div className="positive-Views"
              // style={{width: `${this.props.percent}`; background: `#676abb`}}
              style={{width: `50%`, background: `#676abb`}}
              >
            </div>

            <span className="tooltiptext">1979/30</span>
          </div>
        </div>

        <div className="track-card__body">

          {/* <div dangerouslySetInnerHTML={{__html: `${track.highlight.body["0"]}... \n ${track.highlight["1"]}... ${track.highlight["2"]} `  }} /> */}
          {/* {preview} */}
          {/* {this.renderPreviews()} */}
          <div className="hover-me">
            {this.renderPreVIEWS()}

          </div>
          {/* <div dangerouslySetInnerHTML={{__html: `${track.highlight.length} `  }} /> */}
          {/* <div className="testEx">{track.highlight}</div> */}
        </div>


          {/* <button className="track-card__btn" onClick={this.handleClick}>
            <i className="fa fa-heart-o"></i>
            <span className="track-card__views">1</span>
            <span className="track-card__views">{this.props.viewsCount}</span>
          </button> */}
          {/* <span className="track-card__views">1</span> */}
          {/* {
            this.props.tracks.sorf((a, b) => {

            }).toList().map((entry) => {

            })
          } */}

          <LikeButton
            onLike={this.props.onLike}
            onCancelLike={this.props.onCancelLike}
            onDislike={this.props.onDislike}
            onCancelDislike={this.props.onCancelDislike}
            liked={track.liked}
            track={track}
            onClick={this.props.onClick}
            track={this.props.track}
            disliked={track.disliked}
            viewsCount={track.viewsCount}
            likesCount={track.likesCount}
            dislikesCount={track.dislikesCount}
          />

          {/* <div className="view-more">
            <span><i className="flash fa fa-flash"/>VIEW More...</span>
          </div> */}
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
    // return <span dangerouslySetInnerHTML={{ __html: `${previews.join('...')}`}} />;
    if (this.props.highlight.body) {
      return (
        <div>
          <span dangerouslySetInnerHTML={{ __html: `${previews.join("...<br />")}`}} />
          {/* <br/> */}
          {/* <a className="bra">(Read more..)</a> */}
        </div>
      );
    }


    // return <span dangerouslySetInnerHTML={}
    // return <div>{this.props.highlight.body.map((preview) =>  {<span dangerouslySetInnerHTML={{ __html: `${preview}`}}/>}).reduce((prev, curr) => [prev, '...', curr])}</div>
    // return <div>{this.props.highlight.body.map(preview => <span>{preview}</span>).reduce((prev, curr) => [prev, '...', curr])}</div>
  };
}
export default TrackCard;
