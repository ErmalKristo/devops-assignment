import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://www.orimi.com'
  });

  const fileData = await httpClient.get('/pdf-test.pdf', 
  {responseType: 'arraybuffer'});