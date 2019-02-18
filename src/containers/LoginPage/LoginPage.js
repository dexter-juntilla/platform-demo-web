import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { sendRequestAwait } from '../../redux/request/request.action';
import { selectRequestObject } from '../../redux/request/request.selector';
import type { ActionCreator, RequestObject } from '../../redux/util/types';
import { LOGIN } from '../../redux/request/request.constants';
import { LoginForm } from '../../components/forms/LoginForm';

type StateProps = {
  loginRequestState: RequestObject,
};

type DispatchProps = {
  sendRequestAwait: ActionCreator,
};

type Props = StateProps & DispatchProps;

class LoginPage extends PureComponent<Props> {
  login = (email: string, password: string) => {
    this.props.sendRequestAwait(LOGIN, '', { email, password });
  };

  render() {
    return <LoginForm />;
  }
}

const mapStateToProps = state => ({
  loginRequestState: selectRequestObject(state, LOGIN, ''),
});

const mapDispatchToProps = dispatch => ({
  sendRequestAwait: (key, id, params) =>
    dispatch(sendRequestAwait(key, id, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
