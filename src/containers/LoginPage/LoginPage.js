import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  sendRequestAwait,
  dismissResult,
} from '../../redux/request/request.action';
import { selectRequestObject } from '../../redux/request/request.selector';
import type { ActionCreator, RequestObject } from '../../redux/util/types';
import { LOGIN } from '../../redux/request/request.constants';
import { LoginForm } from '../../components/forms/LoginForm';

type StateProps = {
  loginRequestState: RequestObject,
};

type DispatchProps = {
  sendRequestAwait: ActionCreator,
  dismissResult: ActionCreator,
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

const mapStateToProps: StateProps = state => ({
  loginRequestState: selectRequestObject(state, LOGIN, ''),
});

const mapDispatchToProps: DispatchProps = dispatch => ({
  sendRequestAwait: (key, id, params) =>
    dispatch(sendRequestAwait(key, id, params)),
  dismissResult: (key, id) => dispatch(dismissResult(key, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
