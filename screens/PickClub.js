import React, {useEffect, useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View 
} from 'react-native';
import { NFTCard, SimpleHeader, FocusedStatusBar,BackgroundImg } from "../components";
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const PickClub = ({ route, navigation }) => {
  
    const [leagueData, setLeagueData] = useState([]);
    const [clubData, setClubData] = useState([]);
    const [divisionData, setDivisionData] = useState([]);
    const [league, setLeague] = useState(null);
    const [club, setClub] = useState(null);
    const [division, setDivision] = useState(null);
    const [leagueName, setLeagueName] = useState(null);
    const [clubName, setClubName] = useState(null);
    const [divisionName, setDivisionName] = useState(null);
    const [teamId, setTeamId] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
          

      useEffect(() => {
    

     var config = {
        method: 'get',
        url: `https://footballresults.azurewebsites.net/api/leagues?code=3DOzbZZ3ZE2abswz8hKxSyD5kAaqdt0LPva1YrF8VB-UAzFuT0ZQ2w==`,
        headers: {      
        },        
      };
   
      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          var count = Object.keys(response.data).length;
          let leagueArray = [];
          for (var i = 0; i < count; i++) {          
            leagueArray.push({              
              value: response.data[i].Id,     
              label: response.data[i].LeagueName,
            });
          }
          setLeagueData(leagueArray);          
        })
        .catch(error => {
          console.log(error);
        });  

        var value = AsyncStorage.getItem("league");
        setLeagueName(value);
        setLeague(1);
        var valueClubId = AsyncStorage.getItem("clubid");
        setClub(10483);
        handleClub(value);
        handleDivision(league, 10483);
        console.log("valueclubid" + club);
        console.log(value);
    }, []);
  
    const pleasework = () =>
    {
      if(clubName == null ||divisionName ==null )
      {
        alert('please select a club and division')
        return;      
      }
      getTeam(division,clubName);

      AsyncStorage.setItem("divisionid",division.toString());
      AsyncStorage.setItem("division",divisionName.toString());
      AsyncStorage.setItem("club",clubName.toString());
      AsyncStorage.setItem("league",leagueName.toString());
      AsyncStorage.setItem("clubid",club.toString());
      
      global.ClubNameGlobal = clubName;
      global.DivisionNameGlobal = divisionName;
      global.DivisionId = division;
      global.TeamId = teamId;
      //getTeam(division,clubName); //https://footballresults.azurewebsites.net/api/teams?code=C8p51ZsFglFA9VN_08-mj-rliyr1f3CRny4gvBBxOWTOAzFuSxDNMA==&divisionid=6959
      navigation.navigate('Home', {'paramPropKey': 'paramPropValue'});
    }

    const getTeam = (division,clubName) => {
      axios
          .get("https://footballresults.azurewebsites.net/api/teams?code=C8p51ZsFglFA9VN_08-mj-rliyr1f3CRny4gvBBxOWTOAzFuSxDNMA==", {
            params: {              
              divisionId: division
            }
          })
          .then((response) => {
            console.log(response.data);
            const teamFilter = response.data.filter(x => x.TeamName === clubName );
            console.log(teamFilter);
            console.log(teamFilter[0].TeamId);
            AsyncStorage.setItem("teamid",teamFilter[0].TeamId);
            setTeamId(teamFilter[0].TeamId);
          });

           var value = AsyncStorage.getItem("league");
        setLeagueName(value);
        setLeague(1);
  };

      const handleClub = leagueCode => {
      var config = {
        method: 'get',
        url: `https://footballresults.azurewebsites.net/api/clubs?code=7fkd1z1Y13n4LcGMA6vMRtEAUdS2DnnApe0qBpBhs5-rAzFul40J-w==`,
        headers: {
             },
      };
  
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          var count = Object.keys(response.data).length;
          let clubArray = [];
          for (var i = 0; i < count; i++) {
            clubArray.push({
              value: response.data[i].Id,
              label: response.data[i].ClubName,
            });
          }
         
          setClubData(clubArray);      
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
     const handleDivision = (leagueCode, clubCode) => {

      var config = {
        method: 'get',
        url: `https://footballresults.azurewebsites.net/api/divisions?code=uG9-c1GaXTVe4BglGQU7tXo7j7ro-KLcvpZP4QKlgVHYAzFukcTYoA==&clubId=${clubCode}`,
        headers: {
        },
      };
  
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(config.url);
          var count = Object.keys(response.data).length;
          let divisionArray = [];
      
          for (var i = 0; i < count; i++) {
            divisionArray.push({
              value: response.data[i].Id,
              label: response.data[i].DivisionName,
            });
          }
          setDivisionData(divisionArray);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
    return (
      <View>
<SimpleHeader     title={global.ClubNameGlobal}
            subTitle={global.DivisionNameGlobal}/>
        <StatusBar barStyle="light-content" />
        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
      
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={leagueData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select League' : '...'}
            searchPlaceholder="Search..."
            value={league}
            defaultvalue={leagueName}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setLeague(item.value);
              handleClub(item.value);
              setLeagueName(item.label);
              setIsFocus(false);
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={clubData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Club' : '...'}
            searchPlaceholder="Search..."
            value={club}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setClub(item.value);
              handleDivision(league, item.value);
              setClubName(item.label);
              setIsFocus(false);
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={divisionData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Division' : '...'}
            searchPlaceholder="Search..."
            value={division}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setDivision(item.value);
              setDivisionName(item.label);
              setIsFocus(false);           
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#0F3460',
              padding: 20,
              borderRadius: 15,
              alignItems: 'center',
            }}
            onPress={() =>
              pleasework()             
            }>
            <Text
              style={{
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: '600',
              }}              
              >
              Save my club and division
            </Text>
          </TouchableOpacity>
           
        </View>
      </View>
    );
  };
  
  export default PickClub;
  
  const styles = StyleSheet.create({
    dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 10,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });