import { FETCH_DEMO_RESPONSE } from './demo.action';

export const initialState = {
  data: [],
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_DEMO_RESPONSE:
      return {
        ...state,
        data: action.payload.data.data,
        totalRecords: action.payload.data.totalRecords,
      };
    default:
      return state;
  }
};
