import React from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, Linking } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import {NFTTitle,DateTitle,Scoreboard, CircleButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar,HomeImage , AwayImage } from "../components";

import { images } from '../assets/images';
const DetailsHeader = ({ data, navigation }) => {

  let team = data.HomeTeam.replace(/ /g, '').toUpperCase();
  let logoHome = images[team]["uri"];
  team = data.AwayTeam.replace(/ /g, '').toUpperCase();
  let logoAway = images[team]["uri"];

  return (
  <View style={{ width: "100%", height: 280 }}>
    <Image
      source={assets.backgroundImage}
      resizeMode="cover"
      style={{ width: "100%", height: "80%" }}
    />

      <AwayImage imgUrl={logoAway.toString().toLowerCase()} right={10} top={50} />
      
      <HomeImage imgUrl={logoHome.toString().toLowerCase()} left={10} top={50} />
      <View style={{position: "absolute", top: -80, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>  
        <DateTitle style={{padding:20}}
          title={data.Venue}
          subTitle={data.GameDate}
          titleSize={SIZES.medium}
          subTitleSize={SIZES.small}
        />        
          <Scoreboard Homescore={data.HomeScore} Awayscore={data.AwayScore} Played={data.Played}/>
          
  
        </View>
    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={10}
    />
 
  </View>
);
}

const Details = ({ route, navigation }) => {
  const { data } = route.params;
  let url ='https://www.google.com/maps/dir//53.349716,-6.470781/@53.349716,-6.470781,15z';

  
  const onPress = () => Linking.canOpenURL(url).then(() => {
    Linking.openURL(url);
});

 
  return (
    <SafeAreaView style={{ flex: 1,height: "100%" }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <FlatList
        data={data.bids}
        renderItem={({ item }) => <DetailsBid bid={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 1,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={data} navigation={navigation} />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc data={data} /> 
              <Text onPress={() => Linking.openURL('https://www.google.com/maps/dir//53.349716,-6.470781/@53.349716,-6.470781,15z')}>Click for directions</Text>     
              <Image
      source={images["LUCANUTDDIRECTIONS"]["uri"]}
      resizeMode="cover"
      style={{ width: "100%", height: 250 }}
    />      
    
            </View>
          </React.Fragment>
        )}
      />  
    </SafeAreaView>
  );
};

 

export default Details;
