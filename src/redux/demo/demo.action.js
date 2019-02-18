export const FETCH_DEMO_DATA = 'FETCH_DEMO_DATA';
export const FETCH_DEMO_RESPONSE = 'FETCH_DEMO_RESPONSE';

export const fetchDemoData = (query: Object) => ({
  type: FETCH_DEMO_DATA,
  payload: {
    ...query,
  },
});

export const fetchDemoResponse = (data: Object[]) => ({
  type: FETCH_DEMO_RESPONSE,
  payload: {
    data,
  },
});
