import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { TableBody, TableHeader, SimpleHeader, FocusedStatusBar, BackgroundImg } from "../components";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native-virtualized-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { COLORS } from "../constants";

const FootballTableScreen = () => {
  const navigation = useNavigation();
  const [divisionid, setDivisionid] = useState(global.DivisionId || "");
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFootballData = async (divisionvalue) => {
    if (!divisionvalue) {
      console.log("No division ID provided");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    
    const url = `https://footballresults.azurewebsites.net/api/tables?code=H2kxllpl4c9hw5qwuMbdtL1I1TBd601_3ZmqZL4RLIfXAzFuA40x9Q==&divisionid=${divisionvalue}`;

    try {
      const response = await axios.get(url);
      console.log("Table data received:", response.data);
      
      setGameData({
        table: response.data
      });
      setLoading(false);
    } catch (err) {
      console.log("Error fetching table data:", err);
      setError("Failed to load table data");
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          const value = await AsyncStorage.getItem("divisionid");
          
          if (value) {
            setDivisionid(value);
            global.DivisionId = value;
            await getFootballData(value);
          } else {
            console.log("No division ID found in storage");
            setLoading(false);
          }
        } catch (error) {
          console.log("Error loading division data:", error);
          setError("Failed to load division data");
          setLoading(false);
        }
      }

      fetchData();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ height: "100%" }}>
        <SimpleHeader
          title={global.ClubNameGlobal || "Select Club"}
          subTitle={global.DivisionNameGlobal || "Select Division"}
        />
        
        {loading ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ marginTop: 10 }}>Loading table...</Text>
          </View>
        ) : error ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        ) : (
          <>
            <TableHeader />
            <TableBody table={gameData.table} navigation={navigation} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FootballTableScreen;