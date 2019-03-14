export const FETCH_SAMPLE_DATA = 'FETCH_SAMPLE_DATA';
export const LOGIN = 'LOGIN';
export const CREATE_CAR = 'CREATE_CAR';

export default {
  [FETCH_SAMPLE_DATA]: {
    loaderMessage: '',
    defaultErrorMessage: '',
    successMessage: '',
  },
  [LOGIN]: {
    loaderMessage: 'Signing In...',
    defaultErrorMessage: 'Failed to Sign In',
    successMessage: 'Logged In',
  },
  [CREATE_CAR]: {
    loaderMessage: 'Sending...',
    defaultErrorMessage: 'Failed',
    successMessage: 'Success',
  },
};
