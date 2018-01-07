import React from 'react';
import { connect } from 'react-redux';
import { getIsSignedIn } from '../core/reducers';
import history from '../core/history';
import { Redirect } from 'react-router'
const requireAuth = (Component) => {
  class ProtectedComponent extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object.isRequired,
    };
    // componentDidMount() {
    //   if (!this.props.isSignedIn) {
    //     this.context.router.push('/signin');
    //
    // }
    componentWillMount() {
      if (!this.props.isSignedIn) {
        console.log('user not logged in. Redirecting to signin...');
        // history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isSignedIn) {
        console.log('user not logged in. Redirecting to signin...')
        // history.push('/')
      }
    }

    render() {
      if (this.props.isSignedIn) {
        return <Component {...this.props} />;
      } else {
        return <Redirect to='/signin' />;
      }
    }
  }

  const mapStateToProps = (state) => ({
    isSignedIn: getIsSignedIn(state),
  })

  return connect(mapStateToProps)(ProtectedComponent)
}

export default requireAuth
