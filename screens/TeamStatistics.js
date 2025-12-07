import React,  {useEffect, useState} from "react";
import {  useNavigation } from "@react-navigation/native";
import { StyleSheet,View, Text, Image, StatusBar, FlatList, Linking } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { TableBody,TableHeader, ClubHeader, StatHeader, StatBody,CircleButton, HomeImage } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import styled from 'styled-components/native';
import { ScrollView } from 'react-native-virtualized-view'
import { images } from '../assets/images';

const StatsHeader = ({ data, navigation,teamid, teamname}) => { 
   
  let team = teamname.replace(/ /g, '').replace('/', '').replace('u0027','').toUpperCase();

  let fullstats = "Position:" + data["Position"]
    + " P:"  + data["Played"]
    + " W:" + data["Wins"]
    + " D:" + data["Draws"]
    + " L:" + data["Losses"];
  let fullstats2 =  " GF: " + data["GoalsFor"]
    + " GA" + data["GoalsAgainst"]
    + " GD" + data["GoalDifference"]
    + " Points" + data["Played"];

  let logoHome = "";
  try{
    logoHome = images[team]["uri"];
  }
  catch
  {
    logoHome = images["MISSING"]["uri"];
  }   

  return (
    <View
    style={styles.container}
    >
    <View
        style={styles.item1}
      >      
      
   
       
    <CircleButton
      imgUrl={assets.left}
      handlePress={() =>  navigation.goBack()}
      left={15}
      top={10}
 
    />
     <TeamLogo source={logoHome}     left={60}
      top={10}/> 
 </View>

 <View style={styles.item2}>

   <Text
     style={{
       fontFamily: FONTS.bold,
       fontSize: SIZES.large,
       color: COLORS.white,
       margin:10
     }}
   >
    Statistics for  {teamname}
   </Text>
   <Text
     style={{
       fontFamily: FONTS.bold,
       fontSize: SIZES.medium,
       color: COLORS.white,
       margin:0
     }}
   >
    {fullstats}
    </Text>
   <Text
     style={{
       fontFamily: FONTS.bold,
       fontSize: SIZES.small,
       color: COLORS.white,
       margin:0
     }}
   >
    {fullstats2}
   </Text>
 </View>

  </View>
);
}

const TeamStatistics = ({ route, navigation }) => {

  const { itemId , data , teamName , teamId , } = route.params;
 
  let itemId2 = itemId; 
  let gameData = data;
  let teamName2 = teamName
  let teamId2= teamId ;    
  

  return (
 
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView  style={{ height: "100%" }} >
       <StatsHeader  data={gameData} navigation={navigation} teamid={teamId2} teamname={teamName2} />
     
      
		    <InfoText>Below are the Wins</InfoText>
        <StatHeader/>
        <StatBody table={gameData.WinsObject}/>
        <InfoText>Below are the Draws</InfoText>
        <StatHeader/>
        <StatBody table={gameData.DrawsObject}/>
        <InfoText>Below are the Losses</InfoText>
        <StatHeader/>
        <StatBody table={gameData.LossesObject}/>
			</ScrollView>
   </SafeAreaView>
 
  )
}

export default TeamStatistics

const InfoText = styled.Text`
  color: rgb(60, 0, 60);
	font-size: 16px;
	flex: 1;
  font-weight: bold;
	font-family: 'InterRegular';
  margin-bottom: 10px;

`;

const TeamLogo = styled.Image`
  width: 40px;
	height: 40px;
	margin: 2px;
  left: 60px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    backgroundColor: COLORS.purple,
    borderRadius: SIZES.font,
    marginBottom: SIZES.extraLarge,
    margin: SIZES.base,
    ...SHADOWS.dark,
    height: 100,
  },
  item1: {
    width: '30%', // is 50% of container width
    height: 200,
    marginTop: 2
  },
  item2: {
    width: '70%', // is 50% of container width
    height: 200,
    marginTop: 2 
  }
})