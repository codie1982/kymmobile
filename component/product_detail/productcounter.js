import React,
{ useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity,
  Platform, TouchableNativeFeedback
} from "react-native";

import { Ionicons } from "@expo/vector-icons"



function Productcounter(props) {
  let TouchableCmp = TouchableOpacity
  if (Platform.OS == "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }

  return (
    <View>
      <View style={{ flexDirection: "row", padding: 10, borderWidth: 0.5, borderColor: props.colors.primary_color, backgroundColor: "#fff", marginTop: 10, }}>
        <TouchableCmp onPress={props.decrement} style={{ flex: 1, }}>
          <Ionicons style={{ fontSize: 20, color: props.colors.primary_color, textAlign: "center" }}
            name={"ios-remove-circle-outline"}>
          </Ionicons>
        </TouchableCmp>
        <View style={{ flex: 1, }}>
          <Text style={{ textAlign: "center" }}>{props.amount} Adet</Text>
        </View>
        <TouchableCmp onPress={props.increment} style={{ flex: 1, }}>
          <Ionicons style={{ fontSize: 20, color: props.colors.primary_color, textAlign: "center" }}
            name={"ios-add-circle-outline"}>
          </Ionicons>
        </TouchableCmp>
        <View style={{ flex: 2 }}>
          <Text style={{ textAlign: "right" }}>{props.product_sales_price.toFixed(2)} {props.product_price_unit}</Text>
        </View>
      </View>
    </View>
  )
}

export default Productcounter;