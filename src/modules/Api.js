import url from 'url';
import axios from 'axios';
import config from '../config/config';

class Api {
  getHeaders = {};

  postHeaders = {};

  setPostHeaders = (token: string) => {
    this.postHeaders = {
      ...this.postHeaders,
      Authorization: token,
    };
  };

  get = (route: string, params: Object = {}) =>
    axios
      .get(url.resolve(config.api_url, route), {
        params,
      })
      .then(res => res.data);

  post = (route: string, params: Object = {}) =>
    axios
      .post(
        url.resolve(config.api_url, route),
        {
          ...params,
        },
        {
          headers: this.postHeaders,
        },
      )
      .then(res => res.data);
}

export default new Api();
