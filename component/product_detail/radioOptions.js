import React, { useState, useEffect, useContext } from "react";
import {
  View, Text, Picker,
} from "react-native";


let selectedList;
function RadioOptions(props) {
  //const [selectedList, setSelectedList] = useState([])
  const [selected, setSelected] = useState({})

  useEffect(() => {
    selectedList = [];
  }, [])
  const pricecontext = useContext(props.context)
  useEffect(() => {




    //console.log(props.options[selected.selected_index - 1])
    if (typeof props.options[selected.selected_index - 1] !== "undefined") {
      if (Object.keys(selectedList).length != 0) {
        for (let i = 0; i < Object.keys(selectedList).length; i++) {
          for (let [key, value] of Object.entries(selectedList[i])) {
            if (props.group_id == key) {
              selectedList.splice(i, 1)
            }
          }
        }
      }
      selectedList.push({ [props.group_id]: props.options[selected.selected_index - 1] })
    }

    pricecontext.priceDispatch({
      type: "oneSelection",
      selected_option: selectedList,
    })
  }, [selected])

  return (
    <View>
      <View style={{
        padding: 10,
      }}>
        <Text style={{
          fontSize: 16,
          fontStyle: "italic",
          fontFamily: "mclaren",
          color: props.colors.primary_color
        }}>{props.title}</Text>
      </View>
      <Picker
        selectedValue={selected.selected_value}
        onValueChange={(value, index) => {
          setSelected({ selected_value: value, selected_index: index })
          // 
        }} style={{
          flex: 1,
          height: 50,
          backgroundColor: props.colors.primary_color,
          color: "white",

        }}
      >
        <Picker.Item
          key={0}
          label={`${props.title} seçimi yapınız`}
          value={"---"}
        />
        {props.options.map((item, index) =>
          <Picker.Item key={index}
            label={`${item.title} ${item.value != 0 ? "(" : ""}  ${item.value != 0 ? item.direction == 'increase' ? '+' : '-' : ''} ${item.value != 0 ? item.value : ''}  ${item.value != 0 ? item.type == "rate" ? "%" : "" : ""} ${item.value != 0 ? props.price_unit : ""} ${item.value != 0 ? ")" : ""}`} value={item.option_id} />
        )}
      </Picker>
    </View >
  )
}

export default RadioOptions;