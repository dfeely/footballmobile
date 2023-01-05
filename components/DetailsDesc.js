import React, { useState } from "react";
import { View, Text,Image } from "react-native";

import { EthPrice, NFTTitle } from "./SubInfo";
import { COLORS, SIZES, FONTS , assets} from "../constants";
import { CircleButton,DateTitle } from "../components";

const DetailsDesc = ({ data }) => {

  return (
    <>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >    
    <NFTTitle 
                   title={data.HomeTeam}
          subTitle={data.AwayTeam}
          titleSize={SIZES.medium}
          subTitleSize={SIZES.medium}
        />   
    
      </View>

      <View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>
        <Text
          style={{
            fontSize: SIZES.font,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
          }}
        >
          Referee 
        </Text>        
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: SIZES.small,
              fontFamily: FONTS.regular,
              lineHeight: SIZES.large,
            }}
          >
           {data.RefereeName}          
          </Text>   
        </View>
     
        <DateTitle style={{padding:40}}
          title={data.Venue}
          subTitle={data.GameDate}
          titleSize={SIZES.medium}
          subTitleSize={SIZES.small}
        />    

    </>
  );
};

export default DetailsDesc;
