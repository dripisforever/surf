import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { getCurrentUser } from '../../../core/reducers';
import { userActions } from '../../../core/users/actions';
import { getAvatarUrl } from '../../utils/helpers';

import '../../styles/ProfileEditForm.css';


class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };

    this.onDrop = this._onDrop.bind(this);
    this.onSubmit = this._onSubmit.bind(this);
  }

  _onDrop(files) {
    this.setState({ files });
  }

  renderDropzone() {
    const { avatarUrl } = this.props.currentUser;
    if (this.state.files.length > 0) {
      const preview = this.state.files[0].preview;
      return (
        <Dropzone
          className="ProfileEditForm__dropzone"
          multiple={false}
          accept="image/*"
          onDrop={this.onDrop}>
          <div
            className="ProfileEditForm__avatar-img"
            style={{backgroundImage: `url(${preview})`}}>
            <div className="ProfileEditForm__avatar-img-overlay">
              <i className="fa fa-camera ProfileEditForm__camera-icon"/>
            </div>
          </div>
        </Dropzone>
      );
    } else {
      return (
        <Dropzone
          className="ProfileEditForm__dropzone"
          multiple={false}
          accept="image/*"
          onDrop={this.onDrop}>
        <div
          className="ProfileEditForm__avatar-img"
          style={{backgroundImage: `url(${getAvatarUrl(avatarUrl)})`}}>
          <div className="ProfileEditForm__avatar-img-overlay">
            <i className="fa fa-camera ProfileEditForm__camera-icon"/>
          </div>
        </div>
        </Dropzone>
      );
    }
  }

  _onSubmit(fieldValues) {
    this.props.userUpdate(fieldValues, this.state.files[0]);
  }

  render() {
    const {  handleSubmit, currentUser } = this.props;
    return (
      <form className="ProfileEditForm__root" onSubmit={handleSubmit(this.onSubmit)}>
        <div className="ProfileEditForm__profile-container">
          {this.renderDropzone()}
          <h4 className="ProfileEditForm__profile-username">{currentUser.username}</h4>
        </div>
        <div className="ProfileEditForm__form-group">
          <label className="ProfileEditForm__input-label">Username</label>
          <Field
            name="username"
            type="text"
            id="username"
            component="input"
            className="SignUpForm__input"
          />
        </div>
        <div className="ProfileEditForm__form-group">
          <label className="ProfileEditForm__input-label">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            component="input"
            className="SignUpForm__input"
          />
        </div>
        <div className="ProfileEditForm__form-group">
          <label className="ProfileEditForm__input-label">Password</label>
          <Field
            name="password"
            type="text"
            id="password"
            component="input"
            className="SignUpForm__input"
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state);
  return {
    initialValues: {
      username: currentUser.username,
      email: currentUser.email,
      password: currentUser.password,
    },
    login: state.login,
    token: state.client.token,
    currentUser,
  }
}

const mapDispatchToProps = (dispatch) => ({
  userUpdate(formData, file) {
    dispatch(userActions.userUpdate(formData, file));
  }
})



const formed = reduxForm({
    form: 'SignInForm',
    // fields: ['email', 'password'],
})(ProfileEdit)

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
  // dispatch => ({
    // reduxForm() expects the component to have an onSubmit
    // prop. You could also pass this from a parent component.
    // I want to dispatch a redux action.
    // onSubmit: data => dispatch(loginRequest(data)),

  // })
)(formed)

export default connected
