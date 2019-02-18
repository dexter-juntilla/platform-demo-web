import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoginPage } from '../LoginPage';
import '../../sass/App.scss';

type Props = {
  isAuthenticated: boolean,
};

class App extends Component<Props> {
  render() {
    if (this.props.isAuthenticated === true) {
      return <div>Hello</div>;
    }

    return <LoginPage />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authStore.isAuthenticated,
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(App),
);
