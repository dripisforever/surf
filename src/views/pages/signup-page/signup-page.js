// import React from 'react';
//
// class SignUpPage extends React.Component  {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const { match } = this.props;
//     return (
//       <div>bro, {match.params.username} </div>
//     );
//   }
// }
//
// export default SignUpPage;

import React from 'react';
import SignUpForm from '../../containers/SignUpForm';
// import FacebookLoginButton from '../../containers/FacebookLoginButton';
import FormDivider from '../../components/FormDivider';
import '../../styles/SignUp.css';

const SignUpPage = (props) => {
  return (
    <div className="SignUp__root container">
      <div className="row">
        <div className="six columns offset-by-three">
          <div className="SignUp__form-wrapper">
            <SignUpForm />
            <FormDivider />
            {/* <FacebookLoginButton /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
