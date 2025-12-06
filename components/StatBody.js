import React, { Component} from 'react';
import styled from 'styled-components/native';
import { images } from '../assets/images';
import {FlatList} from 'react-native';

class StatBody extends Component  {		 
  state = {
    table: []
  }; 

  render() {      
    return (		 
	 
        <FlatList contentContainerStyle={{flexGrow: 1}}  listKey="YourListName" //put here list name
          data={ this.props.table}					
          renderItem={({item}) => {
						let team = item.TeamName.replace(/ /g, '').replace('/', '').replace('u0027','').replace('(H)','').replace('(A)','').toUpperCase();
						let logo = ""
						try
						{
						logo=images[team]["uri"];
						}
						catch
						{//MISSING
							logo = images["MISSING"]["uri"];  
						}
						let home = "home";
						return (
							<StyledView style={{backgroundColor: '#fff', padding: 10, borderRadius: 5}}>
								<TeamText>{item.DatePlayed}</TeamText>								 
								<TeamLogo source={logo} /> 							 
								<TeamText >{item.TeamName.replace('u0027','')}</TeamText>      						
								<TeamText>{item.Score}</TeamText>    						
							  						
							 						 
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
	border-radius: 10px;
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

export default StatBody;
