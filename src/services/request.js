import axios from 'axios';

import { getToken } from './local_storage';

const client = getToken => () =>
  getToken() !== null
    ? axios.create({
        headers: {
          'x-auth': getToken()
        }
      })
    : null;

export default client(getToken);
