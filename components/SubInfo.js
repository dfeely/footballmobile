import React from "react";
import { View, Image, Text } from "react-native";

import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";


export const DateTitle = ({ title, subTitle, titleSize, subTitleSize }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center"}}>
      <View style={{ width: '100%' ,alignItems: "center"}}>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: subTitleSize,
          color: COLORS.gray,
        }}
      >
       {subTitle}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {title}
      </Text>
      </View>     
    </View>
  );
};

export const NFTTitle = ({ title, subTitle, titleSize, subTitleSize }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center",width: '100%'}}>
      <View style={{ width: '50%' ,alignItems: "center"}}>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {title}
      </Text>
      <Text 
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: subTitleSize,
          color: COLORS.gray,
        }}
      >
     Home
      </Text></View>
      <View style={{ width: '50%', alignItems: "center"}}>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {subTitle}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: subTitleSize,
          color: COLORS.gray
        }}
      >
     Away
      </Text></View>
    </View>
  );
};

const ImageCmp = ({ imgUrl, index }) => {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={{
        width: 48,
        height: 48,
        marginLeft: index === 0 ? 0 : -SIZES.font,
      }}
    />
  );
};

export const Scoreboard = ({Homescore, Awayscore,Played}) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: "50%",  
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.large,
          color: COLORS.primary,
        }}
      >
        {Played}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.large,
          color: COLORS.primary,
        }}
      >
        {Homescore}:{Awayscore}
      </Text>
    </View>
  );
};

