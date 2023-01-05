import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text } from "react-native";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, EthPrice, NFTTitle, Scoreboard, DateTitle } from "./SubInfo";
import { RectButton, CircleButton,HomeImage , AwayImage} from "./Button";

const NFTCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 150,
        }}
      >
       
        <AwayImage imgUrl={assets.club01} right={10} top={10} />
      
        <HomeImage imgUrl={assets.club02} left={10} top={10} />
        <HomeImage imgUrl={data.imageAway} left={40} top={40} />
        <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>  
        <DateTitle style={{padding:10}}
          title={"Meadowbrook"}
          subTitle={"Week 10"}
          titleSize={SIZES.medium}
          subTitleSize={SIZES.small}
        />        
          <Scoreboard />
        </View>
      </View>
   

      <View style={{ width: "100%", padding: SIZES.font , alignItems: "center",   justifyContent: "space-between"}}>
        <NFTTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />
          
 

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >          
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}  
            handlePress={() => navigation.navigate("Details", { data })}
          />

<RectButton
            minWidth={120}
            fontSize={SIZES.font}  
            handlePress={() => navigation.navigate("PickClub", { data })}
          />

<RectButton
            minWidth={120}
            fontSize={SIZES.font}  
            handlePress={() => navigation.navigate("FootballTableScreen", { data })}
          />
        </View>
      </View>
    </View>
  );
};

export default NFTCard;
