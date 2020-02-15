import React, { useState, useEffect } from "react";
import {
  View, Text, Picker,
  AsyncStorage
} from "react-native";

import styles from "../assets/styles";

import { Ionicons } from "@expo/vector-icons"
import { useDispatch } from "react-redux";
function subcompanylist(props) {
  const [subcompany, setsubCompany] = useState("---")

  return (
    <View style={styles.row}>
      <View style={styles.col1}>
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <View>
            <Ionicons name={'ios-pin'} size={20} color={props.colors.text_color} />
          </View>
          <Text style={{
            color: props.colors.text_color,
            fontSize: 18,
            marginLeft: 10,
          }}>Şube Seç : </Text>
        </View>
      </View>
      <View style={styles.col2}>
        <Picker selectedValue={subcompany} style={{
          flex: 1,
          height: 50,
          backgroundColor: props.colors.primary_color,
          color: props.colors.text_color
        }} onValueChange={(item) => setsubCompany(item)}>
          <Picker.Item key={0} label={"Bir Şube Seçin"} value={"---"} />
          <Picker.Item key={1} label={"Meydan Şube"} value={"---"} />
          <Picker.Item key={2} label={"Merkez Şube"} value={"---"} />
        </Picker>
      </View>
    </View>
  )

}
export default subcompanylist;