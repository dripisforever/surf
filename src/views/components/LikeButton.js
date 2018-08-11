import React from 'react';
import '../styles/LikeButton.css';
// import ClickNHold from 'react-click-n-hold';
// import  ReactHoldButton from 'react-long-press';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this._handleClick.bind(this);
    this.onReviewsClick = this._onReviewsClick.bind(this);
    this.likeClick = this._likeClick.bind(this);
  }

  _handleClick(event) {
    event.preventDefault();
    if (this.props.liked) {
      this.props.onDislike();
    } else {
      this.props.onLike();
    }
  }

  _onReviewsClick(event) {
    console.log('REVIEWS');
  }

  _likeClick(e) {
    e.preventDefault();
    console.log('LIKE')
  }

  start(e) {
    console.log('start')
  }
  end(e, enough) {
    console.log('end');
    // console.log(enough ? 'Click released after enough time': 'Click released too soon');
  }

  clickNHold(e) {
    console.log('dislike')
  }

  doubleClick(e){
    e.preventDefault();
    console.log('DOUBLE');
  }


  render() {
    const defBtn = require(`./../images/black-mascot.png`);
    const likedBtn = require(`./../images/purple-mascot-pale.png`);
    // const likedBtn = require(`./../images/aquarius-mascot.png`);
    // const dislikedBtn = require(`./../images/heartbreak-mascot.png`);
    const dislikedBtn = require(`./../images/heartbreak-mascot-red.png`);

    // const defBtn = require
    // const likedBtn = require
    // const dislikedBtn = require

    let button = null;
    let count = null;

    if (this.props.liked) {
      button = <img src={likedBtn} className="LikeButton__icon LikeButton__icon--liked"/>
      count = <span className="track-card__views">{this.props.likesCount}</span>
    } else if (this.props.disliked) {
      button = <img src={dislikedBtn} className="LikeButton__icon LikeButton__icon--liked"/>
      count = <span className="track-card__views">{this.props.dislikesCount}</span>
    } else if (!this.props.disliked && !this.props.liked) {
      button = <img src={defBtn} className="LikeButton__icon LikeButton__icon--liked"/>
      count = <span className="track-card__views">{this.props.viewsCount}</span>
    }
    // const vuseUrl = require(`./../images/red-mascot.png`);
    // const vuseUrl = require(`./../images/purple-mascot.png`);
    // const vuseUrl = require(`./../images/heartbreak-mascot.png`);
    // const vuseUrl = require(`./../images/heartbreak-mascot-black.png`);
    return (
      // <ClickNHold
      //   className="track-card__btn LikeButton__root"
      //   onDoubleClick={this.onReviewsClick}
      //   time={0.250}
      //   onStart={this.start}
      //   onClickNHold={this.clickNHold}
      //   onEnd={this.end}
      //   >
      //<div className="hold-button">
        // <LongPressBtn
        //  ref={(btn) => this.holdButton = btn}
        //  longPressStart={this.longPressStart}
        //  longPressEnd={this.longPressEnd}
        //  pressCallbackTimeout={2000}
        // />
      //</div>
        // <button className="track-card__btn LikeButton__root"
        //   onClick={this.likeClick}
        //   onDoubleClick={this.onReviewsClick}>
        //   {this.props.liked ?
        //   // (<img src="../images/red-mascot.png" className="LikeButton__icon LikeButton__icon--liked"/>) :
        //   (<img src={likedUrl} className="LikeButton__icon LikeButton__icon--liked"/>):
        //   // (<i className="fa fa-heart-o LikeButton__icon"/>)}
        //   (<img src={defUrl} className="LikeButton__icon LikeButton__icon--liked"/>)}
        //   <span className="track-card__views">1979</span>
        // </button>
        <button className="track-card__btn LikeButton__root"
          onClick={this.likeClick}
          onDoubleClick={this.onReviewsClick}>
          {button}
          <span className="track-card__views">1979</span>
          {/* <span className="track-card__views">{count}</span> */}
        </button>
      // </ClickNHold>
    );
  }
}

export default LikeButton;
