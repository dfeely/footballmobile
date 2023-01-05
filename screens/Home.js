import React,  {useEffect, useState} from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NFTCard, GameCard, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS, GamesData } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const Home = ({ data }) => {
 
  const [gameData, setGameData] = useState([]);
  const [leagueName, setLeagueName] = useState([]);
  const [clubName, setClubName] = useState([]);
  const [divisionName, setDivisionName] = useState("");
  const [division, setDivision] = useState("");
  const [divisionid, setDivisionid] = useState("");
  const [teamid, setTeamId] = useState("");
  
  
  useFocusEffect(

    
    React.useCallback(() => {
      async function fetchData() {
        // You can await here
        console.log("focus event on the Home Page");
    var value = await AsyncStorage.getItem("club");
    setClubName(value);
    var value = await AsyncStorage.getItem("division");
    setDivisionName(value);
    //console.log("focus event on the value2" + value);
    var valueDivisionId = await AsyncStorage.getItem("divisionid");
    setDivisionid(valueDivisionId);      
    var valueTeam = await AsyncStorage.getItem("teamid");
    setTeamId(valueTeam);  

    global.ClubNameGlobal = clubName;
    global.DivisionNameGlobal = divisionName;
    global.DivisionId = divisionid;
    global.TeamId = valueTeam;
    //if (divisionid==6959)
    //{
    //    global.TeamId = 75596;   
    //}
    //if (divisionid==6881)    
    //{
        //global.TeamId = 74441;   
    //}
      //getAdvice(75596,6959); //Conor
      //getAdvice(74441,6881); //teamId=74441&divisionId=6881 James
      console.log("global team" + valueTeam);
      console.log("global division" + valueDivisionId);
        getAdvice(valueTeam,valueDivisionId);
       }
  
      fetchData();
    },[divisionid])
  );

  const getAdvice = (team,division) => {
    axios
        .get("https://footballresults.azurewebsites.net/api/games?code=hhsSD7SmNHc0dKHWxqRed9x7skC0LPNo4SlFtSiquYzgAzFuIf_o0Q==", {
          params: {
            teamId: team,
            divisionId: division
          }
        })
        .then((response) => {
          console.log("getadvice team" + team);
          console.log("getadvice division" + division);
          setGameData(response.data);
          console.log(response.data);
        });
};

  /*useEffect(async () => { 
    
    console.log("Load event on the Home Page");
    var value = await AsyncStorage.getItem("club");   
    setClubName(value);
    var value = await AsyncStorage.getItem("division");
    setDivisionName(value);
    var value = await AsyncStorage.getItem("divisionid");
    setDivisionid(value);
    //getAdvice();
    //console.log("this working" + gameData);
   }, []);*/

  const handleSearch = (value) => {
    if (value.length === 0) {
      setGameData(gameData);
    }

    const filteredData = gameData.filter((item) =>
      item.HomeTeam.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setGameData(gameData);
    } else {
      setGameData(filteredData);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
       <View style={{ zIndex: 0 }}>        
      <FlatList
            data={gameData}
            renderItem={({ item }) => <GameCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch}
            title={clubName}
            subTitle={divisionName}
            />}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View
            style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
