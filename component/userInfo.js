import React from 'react'
import { useSelector } from "react-redux";
import {
  View, Text
} from "react-native";
function UserInfo(props) {
 
  const customer_information = useSelector(state => state.customer_information.customer_general)
  return (
    <View style={{ width: "100%", padding: 10, backgroundColor: "#1188b3" }}>
      <Text style={{ fontSize: 14, fontWeight: "500", color: "#fff" }}>Merhaba {customer_information.customer_name} {customer_information.customer_lastname}</Text>
    </View>
  )
}

export default UserInfo
