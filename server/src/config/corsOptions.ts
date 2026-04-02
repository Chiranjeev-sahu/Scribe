import config from './config.js';
export default {
  origin: [config.frontendUri, 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  headers: ['Content-type', 'Authorization', 'Accept', 'Origin'],
};
