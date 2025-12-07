import React, {useEffect, useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { NFTCard, SimpleHeader, FocusedStatusBar, BackgroundImg } from "../components";
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { API_ENDPOINTS } from '../constants/api';

const PickClub = ({ route, navigation }) => {
  
  const [clubData, setClubData] = useState([]);
  const [divisionData, setDivisionData] = useState([]);
  const [club, setClub] = useState(null);
  const [division, setDivision] = useState(null);
  const [clubName, setClubName] = useState(null);
  const [divisionName, setDivisionName] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  
  // League is always DDSL
  const leagueName = "DDSL";
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load clubs on mount
        await loadClubs();
        
        // Load saved values if they exist
        const savedClubId = await AsyncStorage.getItem("clubid");
        const savedClubName = await AsyncStorage.getItem("club");
        const savedDivisionId = await AsyncStorage.getItem("divisionid");
        const savedDivisionName = await AsyncStorage.getItem("division");
        
        if (savedClubId) {
          setClub(parseInt(savedClubId));
          setClubName(savedClubName);
          // Load divisions for saved club
          await loadDivisions(savedClubId);
        }
        
        if (savedDivisionId) {
          setDivision(parseInt(savedDivisionId));
          setDivisionName(savedDivisionName);
        }
        
      } catch (error) {
        
      }
    };
    
    fetchData();
  }, []);

  const loadClubs = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.CLUBS);      
      
      const clubArray = response.data.map(club => ({
        value: club.id || club.Id,
        label: club.clubName || club.ClubName,
      }));      
      setClubData(clubArray);
    } catch (error) {      
      alert('Could not load clubs');
    }
  };
 
  const loadDivisions = async (clubId) => {
    try {      
      const response = await axios.get(API_ENDPOINTS.DIVISIONS, {
      params: { clubId: clubId }
      });      
      
      const divisionArray = response.data.map(division => ({
        value: division.id,
        label: division.divisionName,
      }));      
      
      setDivisionData(divisionArray);
    } catch (error) {      
      alert('Could not load divisions for this club');
    }
  };

  const handleClubChange = async (item) => {
    setClub(item.value);
    setClubName(item.label);
    setDivision(null); // Reset division when club changes
    setDivisionName(null);
    setDivisionData([]); // Clear divisions
    setIsFocus(false);    
    // Load divisions for selected club
    await loadDivisions(item.value);
  };

  const handleDivisionChange = (item) => {
    setDivision(item.value);
    setDivisionName(item.label);
    setIsFocus(false);
  };

  const getTeam = async (divisionId, clubName) => {
    try {
      const response = await axios.get(API_ENDPOINTS.TEAMS,
        {
          params: {
            divisionId: divisionId
          }
        }
      );      
      // Filter by teamName (lowercase)
      const teamFilter = response.data.filter(x => x.teamName === clubName);    
      
      if (teamFilter.length > 0) {
        const teamId = teamFilter[0].teamId;
        await AsyncStorage.setItem("teamid", teamId.toString());
        setTeamId(teamId);
        
        // Navigate to home
        navigation.navigate('Home', {'paramPropKey': 'paramPropValue'});
      } else {   
        alert('Team not found for this division. Available teams: ' + response.data.map(t => t.teamName).join(', '));
      }
      
    } catch (error) {
      alert('Error loading team data');
    }
  };

  const saveSelection = async () => {
    if (!clubName || !divisionName) {
      alert('Please select both a club and division');
      return;
    }
    
    try {
      // Save to AsyncStorage
      await AsyncStorage.setItem("divisionid", division.toString());
      await AsyncStorage.setItem("division", divisionName);
      await AsyncStorage.setItem("club", clubName);
      await AsyncStorage.setItem("league", leagueName);
      await AsyncStorage.setItem("clubid", club.toString());
      
      // Update global variables
      global.ClubNameGlobal = clubName;
      global.DivisionNameGlobal = divisionName;
      global.DivisionId = division;
      global.TeamId = teamId;
      
      // Get team and navigate
      await getTeam(division, clubName);
      
    } catch (error) {      
      alert('Error saving your selection');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SimpleHeader
        title={clubName || "Select Club"}
        subTitle={divisionName || "Select Division"}
      />
      
      <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
        
        {/* League - Fixed to DDSL */}
        <View style={styles.fixedLeague}>
          <Text style={styles.fixedLeagueLabel}>League:</Text>
          <Text style={styles.fixedLeagueValue}>DDSL</Text>
        </View>
        
        {/* Club Dropdown */}
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
          placeholder="Select Club"
          searchPlaceholder="Search..."
          value={club}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleClubChange}
        />
        
        {/* Division Dropdown */}
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
          placeholder={club ? "Select Division" : "Select a club first"}
          searchPlaceholder="Search..."
          value={division}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleDivisionChange}
          disable={!club || divisionData.length === 0}
        />
        
        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveSelection}>
          <Text style={styles.saveButtonText}>
            Save my club and division
          </Text>
        </TouchableOpacity>
         
      </View>
    </SafeAreaView>
  );
};

export default PickClub;

const styles = StyleSheet.create({
  fixedLeague: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  fixedLeagueLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 10,
    color: '#333',
  },
  fixedLeagueValue: {
    fontSize: 14,
    color: '#0F3460',
    fontWeight: '600',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#999',
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
  saveButton: {
    backgroundColor: '#0F3460',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});