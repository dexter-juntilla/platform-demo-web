export type Action = { type: string, payload?: Object };

export type ActionCreator = (params?: any) => Action;

export type RequestObject = {
  sending: boolean,
  error: boolean,
  success: boolean,
  message: string,
};

export type FormProps = {
  // values,
  // errors,
  // touched,
  // handleChange,
  // handleBlur,
  // handleSubmit,
  // isSubmitting
};
