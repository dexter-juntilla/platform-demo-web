export const FETCH_DEMO_RESPONSE = 'FETCH_DEMO_RESPONSE';

export const fetchDemoResponse = (data: Object[]) => ({
  type: FETCH_DEMO_RESPONSE,
  payload: {
    data,
  },
});
