import React, { Component } from 'react';
import styled from 'styled-components/native';
import { images } from '../assets/images';
import { FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class TableBody extends Component {
  state = {
    table: []
  };

  render() {
    const { navigation } = this.props;
    
    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={this.props.table}
        renderItem={({ item }) => {
          let team = item.teamName.replace(/ /g, '').replace('/', '').replace('u0027', '').toUpperCase();
          let logo = "";
          
          try {
            logo = images[team]["uri"];
          } catch {
            logo = images["MISSING"]["uri"];
          }

          return (
            <StyledView style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5 }}>
              <InfoText>{item.position}</InfoText>
              <Pressable
                onPress={() => navigation.navigate('TeamStatistics', {
                  itemId: 86,
                  data: item,
                  teamName: item.teamName.replace('u0027', ''),
                  teamId: item.teamId,
                })}
              >
                <TeamLogo source={logo} />
              </Pressable>
              <TeamText>{item.teamName.replace('u0027', '')}</TeamText>
              <InfoText>{item.played}</InfoText>
              <InfoText>{item.wins}</InfoText>
              <InfoText>{item.draws}</InfoText>
              <InfoText>{item.losses}</InfoText>
              <InfoText>{item.goalDifference}</InfoText>
              <InfoText>{item.points}</InfoText>
            </StyledView>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-color: rgb(241, 241, 241);
  border-bottom-width: 1px;
  border-style: solid;
  padding: 8px;
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

export default TableBody;