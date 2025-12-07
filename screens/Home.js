import React, {useEffect, useState} from "react";
import { View, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from "@react-navigation/native";
import { GameCard, HomeHeader, FocusedStatusBar } from "../components";
import { API_ENDPOINTS, COLORS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const Home = ({ data }) => {
  const [refreshing, setRefreshing] = useState(true);
  const [bakgameData, setbakGameData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [clubName, setClubName] = useState("");
  const [clubId, setClubId] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [divisionid, setDivisionid] = useState("");
  const [teamid, setTeamId] = useState("");
  
  const loadUserData = () => {    
    getAdvice(teamid, divisionid);
  };

  useFocusEffect(    
    React.useCallback(() => {
      async function fetchData() {
        try {
          const value = await AsyncStorage.getItem("club");
          setClubName(value || "");
          
          const valueClubId = await AsyncStorage.getItem("clubid");
          setClubId(valueClubId || "");
          
          const valueDivision = await AsyncStorage.getItem("division");
          setDivisionName(valueDivision || "");
          
          const valueDivisionId = await AsyncStorage.getItem("divisionid");
          setDivisionid(valueDivisionId || "");
          
          const valueTeam = await AsyncStorage.getItem("teamid");
          setTeamId(valueTeam || "");

          // Update global variables
          global.ClubNameGlobal = value;
          global.ClubId = valueClubId;
          global.DivisionNameGlobal = valueDivision;
          global.DivisionId = valueDivisionId;
          global.TeamId = valueTeam;          
           
          // Fetch games data
          if (valueTeam && valueDivisionId) {
            getAdvice(valueTeam, valueDivisionId);
          } else {
            setRefreshing(false);
          }
        } catch (error) {          
          setRefreshing(false);
        }
      }
      
      fetchData();
    }, [])
  );

  const getAdvice = (team, division) => {
    if (!team || !division) {      
      setRefreshing(false);
      return;
    }

    setRefreshing(true);
    axios
      .get(API_ENDPOINTS.GAMES, {
        params: {
          teamId: team,
          divisionId: division
        }
      })
      .then((response) => {        
        setGameData(response.data);
        setbakGameData(response.data);
        setRefreshing(false);
      })
      .catch((error) => {        
        setRefreshing(false);
        Alert.alert('Error', 'Failed to load games. Please try again.');  
      });
  };

  const handleSearch = (value) => {
    if (!value || value.length < 3) {       
      setGameData(bakgameData);   
      return;
    }      

    const filteredData = bakgameData.filter((item) =>
      item.home_team?.toLowerCase().includes(value.toLowerCase()) || 
      item.away_team?.toLowerCase().includes(value.toLowerCase())
    );

    setGameData(filteredData.length > 0 ? filteredData : bakgameData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}> 
          <FlatList
            data={gameData}
            renderItem={({ item }) => <GameCard data={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <HomeHeader 
                onSearch={handleSearch}
                title={clubName}
                subTitle={divisionName}
              />
            }
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={loadUserData} 
              />
            }
            ListEmptyComponent={
              refreshing ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
              ) : null
            }
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
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;