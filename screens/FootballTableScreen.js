import React,  {useEffect, useState} from "react";
import { View,Text } from "react-native";
import { TableBody,TableHeader, SafeAreaView, SimpleHeader, FocusedStatusBar,BackgroundImg } from "../components";
import { useFocusEffect } from "@react-navigation/native";
 
import { ScrollView } from 'react-native-virtualized-view'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const FootballTableScreen = () => {

    const [divisionid, setDivisionid] = useState(global.DivisionId);
    const [gameData, setGameData] = useState([]);
  
   const getFootballData = (divisionvalue) => {

    let text1 = "https://footballresults.azurewebsites.net/api/tables?code=H2kxllpl4c9hw5qwuMbdtL1I1TBd601_3ZmqZL4RLIfXAzFuA40x9Q==&divisionid=";
      
    let text2 = divisionvalue;
    let result = text1.concat(text2);
    console.log("seems to work football screen Page" + result);
    fetch(result).then(res => {
      return res.json();
    }).then(res => {		
      setGameData({
        table: res
      });
	  console.log(res);
    }).catch(err => {
			console.log(err);
		});
 

};
 

  useFocusEffect(
    
    React.useCallback(() => {
      async function fetchData() {
        // You can await here
        console.log("load event on the football screen Page");
      var value = await AsyncStorage.getItem("divisionid");
    setDivisionid(value);  
    console.log("load event on the football screen Page divisionid" + divisionid);
    console.log("load event on the football screen Page value" + value);
    global.DivisionId = divisionid;  
    //if(divisionid.toString().length>0)
    //{
      getFootballData(value);
    //}
  }
  
  fetchData();
},[])


);

  return (
 
   
    <ScrollView  style={{ height: "100%" }} >
    <SimpleHeader     title={global.ClubNameGlobal}
            subTitle={global.DivisionNameGlobal}/>
				<TableHeader />
				<TableBody fuckthis={global.DivisionId}  table={gameData.table} />
			</ScrollView>
   
 
  )
}

export default FootballTableScreen