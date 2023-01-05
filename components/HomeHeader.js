import React,  {useEffect, useState} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, TextInput,TouchableHighlight, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { RectButton} from "./Button";
import styled from 'styled-components/native';
import { useNavigation } from "@react-navigation/native";

const image = { uri: "https://reactjs.org/logo-og.png" };

const HomeHeader = ({ onSearch, title, subTitle }) => {  

  if (title ==null)
  {
    
    title = "not selected, go to settings";
    subTitle = "not selected, go to settings";
  }
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
          style={{ width: 60, height: 60 }}
        />

        <View style={{ width: 60, height: 60 }}>
          <Image
            source={assets.club01}
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

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder="Search Clubs"
            style={{ flex: 1 }}
            onChangeText={onSearch}
                      
            ></TextInput>
         
        </View>
      </View>
    </View>
  );
};


const NavView = styled.View`
	flex-direction: row;
	margin-bottom: 20px;
	margin-left: 20px;
	margin-right: 20px;
	justify-content: space-between;
`;
const MenuText = styled.Text`
	font-family: 'premierleague';
  color: rgb(60, 0, 60);
	font-size: 22px;
`;
export default HomeHeader;
