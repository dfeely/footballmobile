import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { images } from '../assets/images';
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import {  NFTTitle, Scoreboard, DateTitle } from "./SubInfo";
import { RectButton, HomeImage, AwayImage } from "./Button";

const GameCard = ({ data }) => {
  const navigation = useNavigation();

  // Add null check with updated property names
  if (!data || !data.home_team || !data.away_team) {
    return null;
  }

  let team = data.home_team.replace(/ /g, '').replace('/', '').replace('u0027', '').toUpperCase();
  let logoHome = "";
  let logoAway = "";

  try {
    logoHome = images[team]["uri"];
  } catch {
    logoHome = images["MISSING"]["uri"];
  }

  try {
    team = data.away_team.replace(/ /g, '').replace('/', '').replace('u0027', '').toUpperCase();
    logoAway = images[team]["uri"];
  } catch {
    logoAway = images["MISSING"]["uri"];
  }

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
          height: 120,
        }}
      >
        <AwayImage imgUrl={logoAway.toString().toLowerCase()} right={10} top={10} />
        <HomeImage imgUrl={logoHome.toString().toLowerCase()} left={10} top={10} />
        
        <View style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <DateTitle
            style={{ padding: 10 }}
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
      </View>

      <View style={{
        width: "100%",
        padding: SIZES.font,
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <NFTTitle
          title={data.home_team}
          subTitle={data.away_team}
          titleSize={SIZES.medium}
          subTitleSize={SIZES.medium}
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
            handlePress={() =>
              navigation.navigate('Details', {
                itemId: 86,
                data: data,
              })
            }
            caption="View Details"
          />
        </View>
      </View>
    </View>
  );
};

export default GameCard;