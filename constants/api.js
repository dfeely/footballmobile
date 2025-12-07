// constants/api.js
import { API_KEYS } from '../apiKeys';


const BASE_URL = 'https://footballresults.azurewebsites.net/api';

export const API_ENDPOINTS = {
  GAMES: `${BASE_URL}/games?code=${API_KEYS.GAMES_API_KEY}`,
  LEAGUES: `${BASE_URL}/leagues?code=${API_KEYS.LEAGUES_API_KEY}`,
  CLUBS: `${BASE_URL}/clubs?code=${API_KEYS.CLUBS_API_KEY}`,
  DIVISIONS: `${BASE_URL}/divisions?code=${API_KEYS.DIVISIONS_API_KEY}`,
  TEAMS: `${BASE_URL}/teams?code=${API_KEYS.TABLES_API_KEY}`,
  TABLES: `${BASE_URL}/tables?code=${API_KEYS.TABLES_API_KEY}`,
};

 