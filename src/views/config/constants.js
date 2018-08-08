// // Production Mode
// export const API_URL = process.env.NODE_ENV === 'production' ?
//                       'https://views-api.herokuapp.com/api' :
//                       'https://views-api.herokuapp.com/api';

export const WS_URL =  process.env.NODE_ENV === 'production' ?
                       'wss://views-api.herokuapp.com/api/cable' :
                       'wss://views-api.herokuapp.com/api/cable';

// Development Mode
export const API_URL = process.env.NODE_ENV === 'production' ?
                     'https://views-api.herokuapp.com/api' :
                     'http://localhost:5000/v1';
//
// export const WS_URL =  process.env.NODE_ENV === 'production' ?
//                       'wss://views-api.herokuapp.com/api/cable' :
//                       'ws://localhost:5000/api/cable';
