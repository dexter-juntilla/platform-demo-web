import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import { sendRequestAwait } from '../../../redux/request/request.action';
import { LOGIN } from '../../../redux/request/request.constants';
import { selectRequestObject } from '../../../redux/request/request.selector';
import { RequestObject, FormProps } from '../../../redux/util/types';
import './styles.css';

type StateProps = {
  loginRequestState: RequestObject,
};

type DispatchProps = {
  loginRequestState: RequestObject,
};

type Props = StateProps & FormProps;

class LoginForm extends PureComponent<Props> {
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={values => {
          const { email, password } = values;
          this.props.sendRequestAwait(LOGIN, '', {
            email,
            password,
          });
        }}
        render={props => (
          <form className="login">
            <h1 className="login-title">Simple Login</h1>
            <input
              component="input"
              className="login-input"
              placeholder="Email Adress"
              type="email"
              name="email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            {props.errors &&
              props.errors.email &&
              props.touched.email &&
              props.errors.email}
            <input
              name="password"
              type="password"
              className="login-input"
              placeholder="Password"
              component="input"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            {props.errors &&
              props.errors.password &&
              props.touched.password &&
              props.errors.password}
            <button
              type="button"
              onClick={props.handleSubmit}
              className="login-button"
            >
              Lets Go
            </button>

            {this.props.loginRequestState.sending && <div className="loader" />}
          </form>
        )}
      />
    );
  }
}

const mapStateToProps: StateProps = state => ({
  loginRequestState: selectRequestObject(state),
});

const mapDispatchToProps = dispatch => ({
  sendRequestAwait: (key: string, id: string, params: Object) =>
    dispatch(sendRequestAwait(key, id, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
