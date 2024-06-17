import axios from 'axios';

// Base URL for the API
const baseURL = 'https://topup.seerbitapigateway.com/api';
let authToken = '';

// Function to authenticate and get a token
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

// Function to get the authentication headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${authToken}`,
  'Content-Type': 'application/json',
});

// Function to retry the request after re-authentication
const retryAuth = async (requestFn) => {
  try {
    await authenticate();
    return await requestFn();
  } catch (error) {
    console.error('Retry after authentication failed:', error);
    throw error;
  }
};

// Function to make airtime top-up API call
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

// Function to make data top-up API call
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
