import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import type { RequestObject } from '../../../redux/util/types';
import './styles.css';

type Props = {
  dismissError: () => void,
  createCar: (brand: string, color: string) => void,
  createCarRequestState: RequestObject,
};

const colorItems = [
  // { label: 'Red', value: '#FF0000' },
  // { label: 'Pink', value: '#FF1493' },
  // { label: 'Orange', value: '#FFA500' },
  // { label: 'Yellow', value: '#FFFF00' },
  // { label: 'Green', value: '#008000' },
  // { label: 'Blue', value: '#0000FF' },
  // { label: 'White', value: '#FFFFFF' },
  // { label: 'Black', value: '#000000' },
  { label: 'Red', value: 'Red' },
  { label: 'Pink', value: 'Pink' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Yellow', value: 'Yellow' },
  { label: 'Green', value: 'Green' },
  { label: 'Blue', value: 'Blue' },
  { label: 'White', value: 'White' },
  { label: 'Black', value: 'Black' },
];

class CarForm extends PureComponent<Props> {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            // email: 'dexter@mailinator.com',
            email: 'admin@mailinator.com',
            password: '11111111',
          }}
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
            const { brand, color } = values;
            this.props.createCar(brand, color);
          }}
          render={props => (
            <form className="login">
              {this.props.createCarRequestState.error === true && (
                <div id="alert">
                  <button
                    type="button"
                    className="alert"
                    onClick={this.props.dismissError}
                  >
                    {this.props.createCarRequestState.message}
                  </button>
                </div>
              )}
              <h1 className="login-title">New Car</h1>
              <input
                component="input"
                className="login-input"
                placeholder="Brand"
                type="text"
                name="brand"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
              {props.errors &&
                props.errors.brand &&
                props.touched.brand &&
                props.errors.brand}
              <Dropdown
                name="color"
                value={props.values.color}
                options={colorItems}
                onChange={props.handleChange}
                placeholder="Select a Color"
              />
              <button
                type="submit"
                onClick={props.handleSubmit}
                className="login-button"
              >
                Lets Go
              </button>

              {this.props.createCarRequestState.sending && <div id="loader" />}
            </form>
          )}
        />
      </div>
    );
  }
}

export default CarForm;
