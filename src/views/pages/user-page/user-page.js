import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import Spinner from '../../components/Spinner';
import { FETCH_PUBLIC_PROFILE_START } from '../../actions/actionTypes';
import history from '../../../core/history';
import {
  getPublicProfileByUsername,
  getIsFetchingPublicProfile,
  getPublicProfileErrors,
  getCurrentUser,
  getPaginationByUsername
} from '../../../core/reducers';
import {userActions} from '../../../core/users/actions';
import { getAvatarUrl, pluralize } from '../../utils/helpers';
import '../../styles/UserPage.css';

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logoutModalIsOpen: false,
      usersModalIsOpen: false,
      newPostModalIsOpen: false,
      modalUserType: null,
      endlessScroll: false,
    };

    this.openLogoutModal = () => this.setState({ logoutModalIsOpen: true });
    this.closeLogoutModal = () => this.setState({ logoutModalIsOpen: false });
    this.closeUsersModal = () => this.setState({ usersModalIsOpen: false });
    this.openNewPostModal = () => this.setState({ newPostModalIsOpen: true });
    this.closeNewPostModal = () => this.setState({ newPostModalIsOpen: false });
    // this.enableEndlessScroll = this._enableEndlessScroll.bind(this);
    // this.handleScroll = this._handleScroll.bind(this);
    this.resetState = () => this.setState({
      logoutModalIsOpen: false,
      postModalIsOpen: false,
      usersModalIsOpen: false,
      activePostIndex: null,
      modalUserType: null,
      endlessScroll: false,
    });
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type:
    // })
    // this.props.dispatch({type: FETCH_PUBLIC_PROFILE_START});
    this.props.loadUser(this.props.match.params.username);
    // this.props.loadUserPosts(this.props.match.params.username);
    // this.props.fetchPublicProfile(this.props.match.params.username);
    // this.props.fetchPostsByUsername(this.props.params.username);
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.props.fetchPublicProfile(nextProps.match.params.username);
      // this.props.fetchPostsByUsername(nextProps.params.username);
      this.resetState();
    }
  }

  _openUsersModal(modalUserType) {
    this.setState({
      usersModalIsOpen: true,
      modalUserType,
    });
  }

  renderMenuButton() {
    if (this.props.isCurrentUser) {
      return (
        <button className="Profile__menu-button" onClick={this.openLogoutModal}>
          <i className="fa fa-ellipsis-h" aria-hidden="true" />
        </button>
      );
    }
  }



  render() {
    const { isFetching, user } = this.props;

    if (isFetching || !user) {
      return (
        <div className="Profile__spinner-container">
          <Spinner />
        </div>
      );
    }


    const { username, avatarUrl } = this.props.user;
    console.log('this.props',this.props);
    return (
      <div className="Profile__root container">
        <div className="row Profile__user-info-container">
          <div className="four columns">
            <div className="Profile__avatar-img-wrapper" style={{backgroundImage: `url(${getAvatarUrl(avatarUrl)})`, backgroundSize: 'cover'}}>
            </div>
          </div>
          <div className="five columns">
            <h3 className="Profile__username">{username}</h3>
            {/* {this.renderActionButton()} */}
            {this.renderMenuButton()}
            <div className="Profile__stats">
              <div className="Profile__stats-item">
                <span className="Profile__stats-count">{user.postIds.length}</span> {pluralize(user.postIds.length, 'post', 'posts')}
              </div>
              <div
                className="Profile__stats-item Profile__stats-item--link"
                onClick={() => this._openUsersModal('followers')}>
                <span className="Profile__stats-count">{user.followersCount}</span> {pluralize(user.followersCount, 'follower', 'followers')}
              </div>
              <div
                className="Profile__stats-item Profile__stats-item--link"
                onClick={() => this._openUsersModal('following')}>
                <span className="Profile__stats-count">{user.followingCount}</span> {pluralize(user.followingCount, 'following', 'following')}
              </div>
            </div>
          </div>
        </div>
        <div className="signOut">
          <ConfirmationModal
            isOpen={this.state.logoutModalIsOpen}
            onRequestClose={this.closeLogoutModal}
            onConfirmClick={this.props.logOut}
            confirmText="Log out"
          />
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  const user = getPublicProfileByUsername(state, match.params.username);
  const currentUser = getCurrentUser(state);

  return {
    user: user,
    isFetching: getIsFetchingPublicProfile(state),
    isCurrentUser: (match.params.username === currentUser.username),

  }
}
const mapDispatchToProps  = {

  loadUser: userActions.fetchPublicProfile,
  loadUserPosts: userActions.fetchPostsByUsername,
  logOut: userActions.logOut
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
