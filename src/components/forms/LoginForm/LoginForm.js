import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import './styles.css';

class LoginForm extends PureComponent<*> {
  render() {
    return (
      <div>
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
            this.props.login(email, password);
          }}
          render={props => (
            <form className="login">
              {this.props.loginRequestState.error === true && (
                <div id="alert">
                  <button
                    type="button"
                    className="alert"
                    onClick={this.props.dismissError}
                  >
                    {this.props.loginRequestState.message}
                  </button>
                </div>
              )}
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

              {this.props.loginRequestState.sending && <div id="loader" />}
            </form>
          )}
        />
      </div>
    );
  }
}

export default LoginForm;
