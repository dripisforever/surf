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
        <button className="track-card__btn LikeButton__root"
          onClick={this.likeClick}
          onDoubleClick={this.onReviewsClick}>
          {this.props.liked ?
          (<i className="fa fa-heart LikeButton__icon LikeButton__icon--liked"/>) :
          (<i className="fa fa-heart-o LikeButton__icon"/>)}
          <span className="track-card__views">1</span>
        </button>
      // </ClickNHold>
    );
  }
}

export default LikeButton;
