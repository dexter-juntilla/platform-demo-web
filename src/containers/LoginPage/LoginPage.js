import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  sendRequestAwait,
  dismissResult,
} from '../../redux/request/request.action';
import { selectRequestObject } from '../../redux/request/request.selector';
import type {
  ActionDispatcher,
  GlobalState,
  RequestObject,
} from '../../redux/util/types';
import { LOGIN } from '../../redux/request/request.constants';
import { LoginForm } from '../../components/forms/LoginForm';

type StateProps = {
  loginRequestState: RequestObject,
};

type DispatchProps = {
  sendRequestAwait: (
    key: string,
    id: string,
    params: Object,
  ) => ActionDispatcher,
  dismissResult: (key: string, id: string) => ActionDispatcher,
};

type Props = StateProps & DispatchProps;

class LoginPage extends PureComponent<Props> {
  login = (email: string, password: string) => {
    this.props.sendRequestAwait(LOGIN, '', { email, password });
  };

  dismissError = () => {
    this.props.dismissResult(LOGIN, '');
  };

  render() {
    return (
      <LoginForm
        dismissError={this.dismissError}
        loginRequestState={this.props.loginRequestState}
        login={this.login}
      />
    );
  }
}

const mapStateToProps: GlobalState => StateProps = state => ({
  loginRequestState: selectRequestObject(state, LOGIN, ''),
});

const mapDispatchToProps: ActionDispatcher => DispatchProps = dispatch => ({
  sendRequestAwait: (key: string, id: string, params: Object) =>
    dispatch(sendRequestAwait(key, id, params)),
  dismissResult: (key, id) => dispatch(dismissResult(key, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
