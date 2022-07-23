import axios from 'axios';
import config from '../../config/env/index.js';

export const httpClient = axios.create({
    baseURL: `${config.backend}`
  });