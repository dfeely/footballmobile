import React from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, Linking } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import {NFTTitle,DateTitle,Scoreboard, CircleButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar,HomeImage , AwayImage } from "../components";

import { images } from '../assets/images';
const DetailsHeader = ({ data, navigation }) => {

  let team = data.HomeTeam.replace(/ /g, '').toUpperCase();
  let logoHome = "";
  try{
    logoHome = images[team]["uri"];
  }
  catch
  {
    logoHome = images["MISSING"]["uri"];
  }
  team = data.AwayTeam.replace(/ /g, '').toUpperCase();
  let logoAway = ""
  
  try{
    logoAway = images[team]["uri"];
  }
  catch
  {
    logoAway = images["MISSING"]["uri"];
  }
  console.log(data);
  

  return (
  <View style={{ width: "100%", height: 280 ,  backgroundColor: "#000000" }}>
    <Image     source={assets.backgroundImage}      resizeMode="cover"      style={{ width: "100%", height: "100%" }}    />

      <AwayImage imgUrl={logoAway.toString().toLowerCase()} right={10} top={80} />
      
      <HomeImage imgUrl={logoHome.toString().toLowerCase()} left={10} top={80} />
      <View style={{position: "absolute", top: -60, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>  
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
 
  const onPress = (url) => Linking.canOpenURL(url).then(() => {
 
    if (url.toString().length>0)
    {
      Linking.openURL(url);
    }
    else
    {
      alert('No directions found');
    }
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
            <View style={{ padding: SIZES.medium }}>
              <DetailsDesc data={data} /> 
              <Text onPress={() => onPress(data.Directions)}>Click for directions       </Text>
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
