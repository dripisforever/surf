import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {reset} from 'redux-form';

import history from '../../core/history';
import { userSignIn } from '../actions';
import { getAuthErrors, getIsAuthenticating } from '../../core/reducers';
import { loginRequest } from '../../core/login/actions';
// import ErrorMessages from '../components/ErrorMessages';
import '../styles/SignInForm.css';

class SignInForm extends Component {

  // renderError(field) {
  //   if (field.touched && field.error) {
  //     return (
  //       <span className="SignInForm__error-text">
  //         {field.error}
  //       </span>
  //     );
  //   }
  // }
  render() {
    const {
        // fields: { email, password },
        handleSubmit,
        userSignIn,
        isAuthenticating,
        pristine,
        submitting,
        token
      } = this.props;

    // if (token) {
      // console.log("yeap");
      // history.push(`/${token.user.attrs.username}`);
      // history.push(`${this.props.currentUser.username}`);
      // return <Redirect to="/"/>;
    // }
    return (
      <form className="SignInForm__root" onSubmit={handleSubmit}>
        <label>Username</label>
        <fieldset>
          <Field
            name="username"
            type="text"
            id="username"
            component="input"
            className="SignUpForm__input"
          />
        </fieldset>
        <label>Password</label>
        <fieldset>
          <Field
          name="password"
          type="password"
          id="password"
          component="input"
          className="SignUpForm__input"
          />
        </fieldset>
        <button className="SignUpForm__button"action="submit" >Login</button>
        {/* <ErrorMessages messages={this.props.errorMessages} /> */}
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

// const mapStateToProps = (state) => ({
//   // errorMessages: getAuthErrors(state),
//   isAuthenticating: getIsAuthenticating(state),
// });

// const connected = connect(mapStateToProps, { userSignIn })(SignInForm)
//
// const formed =  reduxForm({
//   form: 'login',
//   fields: ['email', 'password'],
//   validate,
// }
// )(connected);

const formed = reduxForm({
    form: 'SignInForm',
    // fields: ['email', 'password'],
}, validate)(SignInForm)

const connected = connect(
  state => ({
      login: state.login,
      token: state.client.token
  }),

  dispatch => ({
    // reduxForm() expects the component to have an onSubmit
    // prop. You could also pass this from a parent component.
    // I want to dispatch a redux action.
    onSubmit: data => dispatch(loginRequest(data)),

  })
)(formed)

export default connected
