import React, { useState, useEffect, useContext } from "react";
import {
  View, Text, TouchableOpacity, CheckBox, Platform, TouchableNativeFeedback,
} from "react-native";


function CheckOptions(props) {

  const [options, setOptions] = useState(props.options)
  const [chekced, setChekced] = useState(props.options.default_selection)
  const [selectedOptions, setSelectedOptions] = useState({})
  const pricecontext = useContext(props.context)
  let selected_list = [];
  let selected_options_list = [];

  const selected_value = (selected_option) => {
    let noptions = [];
    let noption = {};

    options.map((item) => {
      if (item.option_id == selected_option.option_id) {
        item.selection = !item.selection
      }
      noption = Object.assign({}, item, { selection: item.selection })
      noptions.push(noption)
    })

    setOptions(noptions)
    options.map((item) => {
      if (item.selection) {
        selected_list.push({ [props.group_id]: item })
      }
    })

    if (selected_list.length == 0) {
      selected_list.push({ [props.group_id]: "empty" })
    }

    pricecontext.priceDispatch({ type: "multipleSelection", selected_options: selected_list })
  }



  let TouchableCmp = TouchableOpacity
  if (Platform.OS == "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }
  return (<View>
    <View style={{ padding: 10, }}>
      <Text style={{ fontSize: 16, fontStyle: "italic", fontFamily: "mclaren", color: props.colors.primary_color }}>{props.title}</Text>
    </View>
    {options.map((option, index) =>
      <TouchableCmp onPress={() => {
        selected_value(option)

      }} key={index}>
        <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 5, backgroundColor: "#fff", borderBottomWidth: 0.5, }}>
          <Text>{`${option.title} ${option.value != 0 ? "(" : ""}${option.value != 0 ? option.direction == 'increase' ? '+' : '-' : ''} ${option.value != 0 ? option.value : ''}${option.value != 0 ? props.price_unit : ""}${option.value != 0 ? option.type == "rate" ? "%" : "" : ""}${option.value != 0 ? ")" : ""}`}</Text>
          <CheckBox value={option.selection} />
        </View>
      </TouchableCmp>
    )}

  </View>
  )
}

export default CheckOptions;