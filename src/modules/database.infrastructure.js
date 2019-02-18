import url from 'url';
import axios from 'axios';
import config from '../config/config';

export const get = (route: string, params: Object = {}) =>
  axios
    .get(url.resolve(config.api_url, route), {
      params,
    })
    .then(res => res.data);
