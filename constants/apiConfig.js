import Constants from 'expo-constants';

const getKey = (keyName) => {
  return Constants.expoConfig?.extra?.[keyName] || '';
};

export const API_ENDPOINTS = {
  GAMES: `https://footballresults.azurewebsites.net/api/games?code=${getKey('GAMES_API_KEY')}`,
  LEAGUES: `https://footballresults.azurewebsites.net/api/leagues?code=${getKey('LEAGUES_API_KEY')}`,
  CLUBS: `https://footballresults.azurewebsites.net/api/clubs?code=${getKey('CLUBS_API_KEY')}`,
  DIVISIONS: `https://footballresults.azurewebsites.net/api/divisions?code=${getKey('DIVISIONS_API_KEY')}`,
  TEAMS: `https://footballresults.azurewebsites.net/api/teams?code=${getKey('TEAMS_API_KEY')}`,
  TABLES: `https://footballresults.azurewebsites.net/api/tables?code=${getKey('TABLES_API_KEY')}`,
};