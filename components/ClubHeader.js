import React, { Component} from 'react';
import styled from 'styled-components/native';
import { images } from '../assets/images';
import {FlatList} from 'react-native';

class ClubHeader extends Component  {
	
   render() {   	 
    return (		 
        <FlatList contentContainerStyle={{flexGrow: 1}}
          data={ this.props.table}					
          renderItem={({item}) => {
						let team = item.TeamName.replace(/ /g, '').replace('/', '').replace('u0027','').toUpperCase();
						let logo = ""
						try
						{
						logo=images[team]["uri"];
						}
						catch
						{//MISSING
							logo = images["MISSING"]["uri"];  
						}
						
						return (
							<StyledView style={{backgroundColor: '#fff', padding: 10, borderRadius: 5}}>								 
								<InfoText>{item.Position}</InfoText>								 
								<TeamLogo source={logo} /> 		
								<TeamText>{item.TeamName.replace('u0027','')}</TeamText>      						
								<InfoText>{item.Played}</InfoText>							 
								<InfoText>{item.Wins}</InfoText>
								<InfoText>{item.Draws}</InfoText>
								<InfoText>{item.Losses}</InfoText>
								<InfoText>{item.GoalDifference}</InfoText>
								<InfoText>{item.Points}</InfoText>
							</StyledView>
						)
						}
					}
					keyExtractor={(item, index) => index}
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

export default ClubHeader;
