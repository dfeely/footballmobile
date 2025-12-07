import React from 'react';
import styled from 'styled-components/native';
import { FlatList, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../assets/images';

// Utility function to normalize team names
const normalizeTeamName = (teamName) => {
  if (!teamName) return '';
  return teamName
    .replace(/\s+/g, '')
    .replace(/\//g, '')
    .replace(/'/g, '')
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

const TableBody = ({ table = [], navigation }) => {
  const renderTableRow = ({ item }) => {
    const logo = getTeamLogo(item.teamName);
    const displayName = cleanTeamName(item.teamName);

    const handlePress = () => {
      navigation.navigate('TeamStatistics', {
        itemId: item.teamId || 86,
        data: item,
        teamName: displayName,
        teamId: item.teamId,
      });
    };

    return (
      <StyledView>
        <InfoText>{item.position}</InfoText>
        <Pressable
          onPress={handlePress}
          accessibilityLabel={`View statistics for ${displayName}`}
          accessibilityRole="button"
        >
          <TeamLogo 
            source={logo}
            accessibilityLabel={`${displayName} logo`}
          />
        </Pressable>
        <TeamText>{displayName}</TeamText>
        <InfoText>{item.played}</InfoText>
        <InfoText>{item.wins}</InfoText>
        <InfoText>{item.draws}</InfoText>
        <InfoText>{item.losses}</InfoText>
        <InfoText>{item.goalDifference}</InfoText>
        <InfoText>{item.points}</InfoText>
      </StyledView>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={table}
      renderItem={renderTableRow}
      keyExtractor={(item, index) => item.teamId?.toString() || index.toString()}
      ListEmptyComponent={
        <EmptyText>No teams available</EmptyText>
      }
    />
  );
};

// PropTypes for type checking
TableBody.propTypes = {
  table: PropTypes.arrayOf(
    PropTypes.shape({
      teamId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      teamName: PropTypes.string.isRequired,
      position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      played: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      wins: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      draws: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      losses: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      goalDifference: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      points: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom-color: rgb(241, 241, 241);
  border-bottom-width: 1px;
  border-style: solid;
  padding: 10px;
  border-radius: 5px;
`;

const InfoText = styled.Text`
  color: rgb(60, 0, 60);
  font-size: 12px;
  flex: 1;
  font-family: 'InterRegular';
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

export default TableBody;