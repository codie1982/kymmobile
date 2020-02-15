import React, { useState, useEffect, } from "react";
import {
  View, Text,
  TouchableOpacity
} from "react-native";

import styles from "../assets/styles";
import { Ionicons } from "@expo/vector-icons"
import { UpperString } from "../function/basic"

function ProductItem(props) {
  return (
    <View style={{ ...styles.product, borderColor: props.colors.primary_color }}>
      <View style={styles.productItemdescription}>
        <View style={styles.topdescription}>
          <View style={styles.plusIcon}>
            <Ionicons style={{ fontSize: 20, color: props.colors.primary_color, textAlign: "center" }}
              name={"ios-add-circle-outline"}>
            </Ionicons>
          </View>
          <View style={styles.title}>
            <Text style={{ ...styles.title_text, color: props.colors.text_color }}>{UpperString(props.title)}</Text></View>
          <View style={styles.price}>
            <Text style={{ ...styles.price_text, color: props.colors.text_color }}>{UpperString(props.price)} {props.unit}</Text></View>
        </View>
        <View style={styles.Bottomdescription}>
          <Text style={styles.Bottomdescription_text} >{props.subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={props.onSelected}>
        <View style={{ ...styles.addJob, backgroundColor: props.colors.primary_color }}>
          <View><Text style={{ ...styles.addJobtitle, color: props.colors.text_color }} numberOfLines={2}>
            {props.buttonText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}


export default ProductItem;