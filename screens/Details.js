import React from "react";
import { View, Text, Image, FlatList, Linking } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import {  SIZES, assets } from "../constants";
import {  DateTitle, Scoreboard, CircleButton,  DetailsDesc,  FocusedStatusBar, HomeImage, AwayImage } from "../components";
import { images } from '../assets/images';

const DetailsHeader = ({ data, navigation }) => {  
  let team = data.home_team
  .replace(/ /g, '')
  .replace('/', '')
  .replace(/'/g, '') // Fix apostrophe handling
  .toUpperCase();
  let logoHome = "";
  
  try {
    logoHome = images[team]["uri"];
  } catch {
    logoHome = images["MISSING"]["uri"];
  }
  
  team = data.away_team.replace(/ /g, '').replace('/', '').replace('u0027', '').toUpperCase();
  let logoAway = "";
  
  try {
    logoAway = images[team]["uri"];
  } catch {
    logoAway = images["MISSING"]["uri"];
  }

  return (
    <View style={{ width: "100%", height: 280, backgroundColor: "#000000" }}>
      <Image
        source={assets.backgroundImage}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />

      <AwayImage imgUrl={logoAway.toString().toLowerCase()} right={10} top={80} />
      <HomeImage imgUrl={logoHome.toString().toLowerCase()} left={10} top={80} />
      
      <View style={{
        position: "absolute",
        top: -60,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <DateTitle
          style={{ padding: 20 }}
          title={data.venue}
          subTitle={data.game_date}
          titleSize={SIZES.medium}
          subTitleSize={SIZES.small}
        />
        <Scoreboard
          Homescore={data.home_score}
          Awayscore={data.away_score}
          Played={data.played}
        />
      </View>
      
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })}
        left={15}
        top={10}
      />
    </View>
  );
}

const Details = ({ route, navigation }) => {
  const { data } = route.params;

  const onPress = (url) => {
    if (!url || url.toString().length === 0) {
      alert('No directions found');
      return;
    }

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        try {
          Linking.openURL(url);
        } catch (error) {
          alert('No directions found: ' + url);
        }
      } else {
        alert('Cannot open URL: ' + url);
      }
    }).catch((error) => {
      alert('Error opening directions');      
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <FlatList
        data={data.bids}        
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 1,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={data} navigation={navigation} />
            <View style={{ padding: SIZES.medium }}>
              <DetailsDesc data={data} />
              <Text onPress={() => onPress(data.directions)}>
                Click for directions
              </Text>
              <Image
                source={images["GOOGLEDIRECTIONS"]["uri"]}
                resizeMode="cover"
                style={{ width: "100%", height: 280 }}
              />
            </View>
          </React.Fragment>
        )}
      />
    </SafeAreaView>
  );
};

export default Details;