// src/api.js
import axios from 'axios';

const baseURL = 'https://topup.seerbitapigateway.com/api';
let authToken = '';

export const authenticate = async () => {
  try {
    const response = await axios.post(`${baseURL}/auth`, {
      username: 'lpk_BuLLz8BJee0d6OP0gaiWEtgLI',
      password: 'spk_DSUvtUi3HFwZdzOHfU0S',
    });
    authToken = response.data.token;
    return authToken;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${authToken}`,
  'Content-Type': 'application/json',
});

const retryAuth = async (requestFn) => {
  try {
    await authenticate();
    return await requestFn();
  } catch (error) {
    console.error('Retry after authentication failed:', error);
    throw error;
  }
};

export const airtimeTopup = async (topupData) => {
  const request = () => axios.post(`${baseURL}/topup/exec/msisdn`, topupData, { headers: getAuthHeaders() });

  try {
    const response = await request();
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return retryAuth(request);
    } else {
      throw error;
    }
  }
};

export const dataTopup = async (topupData) => {
  const request = () => axios.post(`${baseURL}/datatopup/exec/msisdn`, topupData, { headers: getAuthHeaders() });

  try {
    const response = await request();
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return retryAuth(request);
    } else {
      throw error;
    }
  }
};
