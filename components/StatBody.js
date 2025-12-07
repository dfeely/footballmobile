import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../assets/images';

// Utility function to normalize team names
const normalizeTeamName = (teamName) => {
  if (!teamName) return '';
  return teamName
    .replace(/\s+/g, '')
    .replace(/\//g, '')
    .replace(/'/g, '')
    .replace(/\(H\)/g, '')
    .replace(/\(A\)/g, '')
    .toUpperCase();
};

// Utility function to get team logo
const getTeamLogo = (teamName) => {
  const normalized = normalizeTeamName(teamName);
  return images[normalized]?.uri || images.MISSING?.uri;
};

// Utility function to clean display name
const cleanTeamName = (teamName) => {
  return teamName?.replace(/'/g, '') || '';
};

const StatBody = ({ table = [], listKey = 'stat-list' }) => {
  const renderStatRow = ({ item }) => {
    const logo = getTeamLogo(item.teamName);
    const displayName = cleanTeamName(item.teamName);

    return (
      <StyledView>
        <TeamText>{item.datePlayed || 'N/A'}</TeamText>
        <TeamLogo 
          source={logo}
          accessibilityLabel={`${displayName} logo`}
        />
        <TeamText>{displayName}</TeamText>
        <TeamText>{item.score || '-'}</TeamText>
      </StyledView>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      listKey={listKey}
      data={table}
      renderItem={renderStatRow}
      keyExtractor={(item, index) => {
        // Use a unique identifier if available, fallback to index
        return item.id?.toString() || `${item.teamName}-${item.datePlayed}-${index}`;
      }}
      ListEmptyComponent={
        <EmptyText>No match statistics available</EmptyText>
      }
    />
  );
};

// PropTypes for type checking
StatBody.propTypes = {
  table: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      teamName: PropTypes.string.isRequired,
      datePlayed: PropTypes.string,
      score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  listKey: PropTypes.string,
};

const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom-color: rgb(241, 241, 241);
  border-bottom-width: 1px;
  border-style: solid;
  border-radius: 10px;
  padding: 10px;
`;

const TeamText = styled.Text`
  color: rgb(60, 0, 60);
  font-size: 12px;
  flex: 5;
  font-family: 'InterRegular';
`;

const TeamLogo = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const EmptyText = styled.Text`
  color: rgb(100, 100, 100);
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  font-family: 'InterRegular';
`;

export default StatBody;