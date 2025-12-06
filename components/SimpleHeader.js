import React,  {useEffect, useState} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { RectButton, CircleButton} from "./Button";
import { images } from '../assets/images';

const SimpleHeader = ({ onSearch, title, subTitle }) => {  

  let logo = "";
  let team = "";

  if (title ==null)
  {    
    title = "dundrumfc";
    subTitle = "not selected, go to settings";
  }  
   
  try{
    team = title.replace(/ /g, '').toUpperCase();
    logo = images[team]["uri"];
    }
    catch {}

  return (
    <View
      style={{
        backgroundColor: COLORS.purple,
        padding: SIZES.font,
        
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={assets.logo}
          resizeMode="contain"
          style={{ width: 60  , height: 60 }}
        />

        <View style={{ width: 60, height: 60 }}>
          <Image
            source={logo}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" ,
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 75
          }}
          />
          <Image
            source={assets.badge}
            resizeMode="contain"
            style={{
              position: "absolute",
              width: 15,
              height: 15,
              bottom: 0,
              right: 0,
   
            }}
          />
        </View>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
   
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
          }}
        >
         Your club is  {title}
        </Text>

        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
         Division Name is {subTitle}
        </Text>
       
      </View>

    
    </View>
  );
};

export default SimpleHeader;
