import React, { useState, useEffect, useContext } from 'react'
import {
  View, Text, TouchableOpacity
} from "react-native";


function PaginationItem(props) {
  const context = useContext(props.Context)

  if (props.active) {
    return (
      <TouchableOpacity onPress={() => {
        context.Dispatch({
          type: "getPage",
          pageNumber: props.pageNumber,
        })
      }}>
        <View key={0} style={{ width: 50, height: 50, backgroundColor: props.Colors.text_color, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16, color: props.Colors.primary_color }}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity onPress={() => {
        context.Dispatch({
          type: "getPage",
          pageNumber: props.pageNumber,
        })
      }}>
        <View key={0} style={{ width: 50, height: 50, backgroundColor: props.Colors.primary_color, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16, color: props.Colors.text_color }}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

}

export default PaginationItem
