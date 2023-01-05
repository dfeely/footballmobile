import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

import { COLORS, SIZES, FONTS, SHADOWS } from "../constants";

export const CircleButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        ...SHADOWS.light,
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />      
      
    </TouchableOpacity>
    
  );
};


export const HomeImage = ({ imgUrl, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 100,
        backgroundColor: COLORS.white,
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        ...SHADOWS.light,
        ...props,
      }}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 60, height: 60 }}
      />
    </TouchableOpacity>
  );
};


export const AwayImage = ({ imgUrl, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 100,
        backgroundColor: COLORS.white,
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        ...SHADOWS.light,
        ...props,
      }}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 60, height: 60 }}
      />
    </TouchableOpacity>
  );
};


export const RectButton = ({ caption,minWidth, fontSize, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.small,
        borderRadius: SIZES.extraLarge,
        minWidth: minWidth,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: fontSize,
          color: COLORS.white,
          textAlign: "center",
        }}
      >
        {caption}
      </Text>
    </TouchableOpacity>
  );
};
