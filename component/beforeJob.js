import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, AsyncStorage
} from "react-native";

import { useDispatch } from "react-redux";

import styles from "../assets/styles";
//import Colors from "../assets/constant/Colors"
import Carousel from 'react-native-snap-carousel';
import subSliderData from "../data/dummy-data"

const SubSliderItem = () => {
  let TouchableCmp = TouchableOpacity
  if (Platform.OS == "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }
  return <TouchableCmp>
      <View style={{
        width: 100,
        height: 100,
        backgroundColor: "red",
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.primary_color

      }}></View>
  </TouchableCmp>
}
function BeforeJob(props) {
  const dispatch = useDispatch()
  const [Colors, setColors] = useState({})
  useEffect(() => {
    //setisloading(true)
    const loadInfo = async () => {
      const _primary_color = await AsyncStorage.getItem('primary_color');
      const _text_color = await AsyncStorage.getItem('text_color');
      setColors({ primary_color: _primary_color, text_color: _text_color })
      //setisloading(false)
    }
    loadInfo();
  }, [dispatch])
  return (
    <View style={styles.row}>
      <View style={styles.col1}>
        <View style={{
          width: "100%",
          height: 180,
          backgroundColor: "white"
        }}>
          <View style={{
            paddingHorizontal: 10,
            margin: 10,
          }}>
            <Text style={{
              width: "100%",
              backgroundColor: "white",
              color: Colors.text_color,
              fontFamily: "mclaren",
              fontSize: 16
            }}>Önceki Siparişleriniz</Text>
          </View>
          {subSliderData.length == 0 ?
            <View style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#f5f5f5",
              padding: 10,
              borderRadius: 3
            }}>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={subSliderData}
                renderItem={SubSliderItem}
                sliderWidth={300}
                itemWidth={150}
              />
            </View>
            :
            <View style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#f5f5f5",
              padding: 10,
              borderRadius: 3
            }}>
              <Text style={{ color: Colors.text_color }}>Sistemde Daha Önce vermiş olduğunuz bir sipariş bulunmamaktadır</Text>
            </View>
          }
        </View>
      </View>
    </View >
  )

}

export default BeforeJob;