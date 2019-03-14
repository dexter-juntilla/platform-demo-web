import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';

import type { ActionDispatcher, GlobalState } from '../../redux/util/types';
import { LoginPage } from '../loginPage';
import { Demo } from '../demo';
import { AdminDemo } from '../adminDemo';
import { logOut } from '../../redux/auth/auth.action';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../../sass/App.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';

type StateProps = {
  isAuthenticated: boolean,
  accessToken: string,
};

type DispatchProps = {
  logout: () => ActionDispatcher,
};

type Props = StateProps & DispatchProps;

const Protected = (props: { logout: ActionDispatcher }) => (
  <div>
    <h3>Protected</h3>
    <br />
    <button type="button" onClick={props.logout}>
      Log out
    </button>
    <AdminDemo />
  </div>
);

class App extends Component<Props> {
  loginRoute = () => {
    if (this.props.isAuthenticated === false || !this.props.accessToken) {
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
    if (this.props.isAuthenticated === true && this.props.accessToken) {
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
            <Link to="/public">Data Table (Public)</Link>
          </li>
          <li>
            <Link to="/login">Login Page</Link>
          </li>
          <li>
            <Link to="/protected">CarForm (Protected)</Link>
          </li>
        </ul>
        <Route path="/public" component={Demo} />
        <Route path="/login" render={this.loginRoute} />
        <Route path="/protected" render={this.protectedRoute} />
      </div>
    );
  }
}

const mapStateToProps: GlobalState => StateProps = state => ({
  isAuthenticated: state.authStore.isAuthenticated,
  accessToken: state.authStore.token,
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
