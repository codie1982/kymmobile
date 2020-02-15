import React, { useState, useEffect, } from "react";
import {
  View, Text,
  TouchableOpacity, AsyncStorage
} from "react-native";
import styles from "../assets/styles";
import { Ionicons } from "@expo/vector-icons"

import { useDispatch, useSelector } from "react-redux";

import * as jobAction from "../store/actions/jobAction"

function CardItem(props) {
  const isremoveItem = useSelector(state => state.info);
  dispatch = useDispatch()
  let option_text;
  let optionsList = [];

  if (props.options != null) {
    for (let i = 0; i < props.options.length; i++) {
      optionsList.push(props.options[i].title)
    }
    if (optionsList.length != 0) {
      option_text = optionsList.join(",") + " ile";
    }
  }
  const removeItemHandler = async () => {
    await dispatch(jobAction.isjobloading(true))
    const _userID = await AsyncStorage.getItem('userID');
    await dispatch(jobAction.removeProductItem(props.id, _userID))
    await dispatch(jobAction.isjobloading(false))
  }

  return (
    <View style={{ ...styles.jobDescriptionContent, borderColor: props.colors.primary_color }}>
      <View style={styles.descriptionsection}>
        <View style={styles.col3}><Text style={{ ...styles.jobText, color: "#111" }}>{props.title}</Text></View>
        <View style={styles.col1}><Text style={{ ...styles.jobText, color: "#111" }}>{props.price} {props.unit}</Text></View>
        <View style={styles.col1}><Text style={{ ...styles.jobText, color: "#111" }}>X {props.amount} Adet</Text></View>
        <View style={styles.col1}>
          <TouchableOpacity onPress={removeItemHandler}>
            <Ionicons style={{ ...styles.addIcon, color: "red" }} name={"ios-remove-circle-outline"}></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.descriptionhelp}>
        <View>
          <Text style={{ ...styles.helpText, color: props.colors.text_color }}>{option_text}</Text>
        </View>
      </View>
    </View>
  )
}


export default CardItem;