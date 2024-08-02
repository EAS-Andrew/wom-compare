import axios from 'axios';

const API_BASE_URL = 'https://api.wiseoldman.net/v2';
const REQUEST_INTERVAL = 3000; // 3 seconds

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let lastRequestTime = 0;

const rateLimiter = async (request) => {
  const now = Date.now();
  const waitTime = Math.max(0, REQUEST_INTERVAL - (now - lastRequestTime));
  await new Promise((resolve) => setTimeout(resolve, waitTime));
  lastRequestTime = Date.now();
  return request();
};

export const searchPlayers = (username) => rateLimiter(() => apiClient.get(`/players/search?username=${username}`));
export const getPlayerDetails = (username) => rateLimiter(() => apiClient.get(`/players/${username}`));
export const updatePlayer = (username) => rateLimiter(() => apiClient.post(`/players/${username}`));
