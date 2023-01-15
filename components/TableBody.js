import React, { Component, useState} from 'react';
import styled from 'styled-components/native';
import TableHeader from "../components";
import Loading from './Loading';
import { images } from '../assets/images';
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppState,
	FlatList,
	Text,
	ScrollView,
	View,
	Image
} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

 
class TableBody extends Component  {
		 
  state = {
    table: [],okthis: "start value"
  }; 
  
  constructor(props)
  {
	super(props);
	console.log(props)
	console.log("does this even work");

  }
  
  componentDidUpdate(prevProps) {
	if(!equal(this.props.table, prevProps.table)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
	{
		console.log("prop changed");
	}
	console.log("componentDidUpdate called");
  } 

  updateAndNotify = () => {
	console.log("update and notify called");
  }

   

  componentDidUpdate()
	{
		console.log("focus event on the Table Page");
		//this.getFootballData();
	}
	
	componentDidMount() {
		//this.getFootballData();
		 
	}

   

  getFootballData()
  {
    fetch('https://footballresults.azurewebsites.net/api/tables?code=H2kxllpl4c9hw5qwuMbdtL1I1TBd601_3ZmqZL4RLIfXAzFuA40x9Q==&divisionid=' + this.props.fuckthis).then(res => {
      return res.json();
    }).then(res => {		
      this.setState({
        table: res
      });
	  console.log(res);
    }).catch(err => {
			console.log(err);
		});
  }

  render() {

		 
        

    return (
		
		 
        <FlatList contentContainerStyle={{flexGrow: 1}}
          data={
						this.props.table
					}
					ListHeaderComponent={TableHeader}
          renderItem={({item}) => {

						let team = item.TeamName.replace(/ /g, '').replace('/', '').replace('u0027','').toUpperCase();
						//console.log(team);
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

const ContainerView = styled.View`

`;

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
