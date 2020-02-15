import React from "react";
import {
  View, Text
} from "react-native";

function Productdetailheader(props) {

  return (
    <View>
      <View style={{
        paddingHorizontal: 10,
        width: "100%",
      }}><Text style={{
        fontSize: 20,
        fontWeight:"700",
        color: props.colors.text_color
      }}>{props.title}</Text></View>
      <View style={{
        paddingHorizontal: 10,
        width: "100%",
      }}>
        <Text style={{
          fontSize: 14,
          color: props.colors.text_color,
        }}>
          {props.description}
              </Text>
      </View>
    </View>
  )
}

export default Productdetailheader;