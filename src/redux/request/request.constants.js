export const FETCH_SAMPLE_DATA = 'FETCH_SAMPLE_DATA';
export const LOGIN = 'LOGIN';

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
};
