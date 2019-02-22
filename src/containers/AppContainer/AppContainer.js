import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';

import type { ActionDispatcher, GlobalState } from '../../redux/util/types';
import { LoginPage } from '../LoginPage';
import { logOut } from '../../redux/auth/auth.action';
import '../../sass/App.scss';

type StateProps = {
  isAuthenticated: boolean,
};

type DispatchProps = {
  logout: ActionDispatcher,
};

type Props = StateProps & DispatchProps;

const Public = () => <h3>Public</h3>;

const Protected = (props: { logout: ActionDispatcher }) => (
  <div>
    <h3>Protected</h3>
    <button type="button" onClick={props.logout}>
      Log out
    </button>
  </div>
);

class App extends Component<Props> {
  loginRoute = () => {
    if (this.props.isAuthenticated === false) {
      return <LoginPage />;
    }

    return (
      <Redirect
        to={{
          pathname: '/protected',
        }}
      />
    );
  };

  protectedRoute = (props: { location: any }) => {
    if (this.props.isAuthenticated === true) {
      return <Protected logout={this.props.logout} />;
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    );
  };

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/login">Login Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={Public} />
        <Route path="/login" render={this.loginRoute} />
        <Route path="/protected" render={this.protectedRoute} />
      </div>
    );
  }
}

const mapStateToProps: GlobalState => StateProps = state => ({
  isAuthenticated: state.authStore.isAuthenticated,
});

const mapDispatchToProps: ActionDispatcher => DispatchProps = dispatch => ({
  logout: () => dispatch(logOut()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
