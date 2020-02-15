import React from 'react'
import { View, Text, Image, Dimensions, Platform } from "react-native";
import { useSelector } from "react-redux";
function Header() {
  const application_detail = useSelector(state => state.info)
  const settings = useSelector(state => state.settings)

  if (Platform.OS == "ios") {
    if (typeof settings.tema_settings != "undefined") {
      return (
        <View style={{ backgroundColor: "#fff", flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{color: application_detail.info.text_color}}>{settings.tema_settings.site_title}</Text></View>
      )
    } else {
      return <View style={{ backgroundColor: "#fff", flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Yükleniyor...</Text></View>
    }
  } else {
    if (typeof settings.tema_settings != "undefined") {
      if (application_detail.info.title == "image") {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: application_detail.info.primary_color }}>
          <Image source={{ uri: settings.tema_settings.site_logo["100"] }} style={{ width: 100, height: 60, marginTop: 5 }} />
        </View>
      } else {
        return <View style={{ backgroundColor: application_detail.info.primary_color, flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{
            color: application_detail.info.text_color,
            flex: 1, justifyContent: "center", alignItems: "center"
          }}>{settings.tema_settings.site_title}</Text></View>
      }
    } else {
      return <View style={{ backgroundColor: application_detail.info.primary_color, flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Yükleniyor...</Text></View>
    }
  }

}

export default Header
