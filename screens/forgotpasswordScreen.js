import React, { Component, useState } from "react";
import {
  View, Text, Picker, Button,
  ScrollView, StyleSheet,
  SafeAreaView, CheckBox,
  TouchableOpacity, Modal, Alert,
  TouchableHighlight, TextInput
} from "react-native";

import styles from "../assets/styles";
import Colors from '../assets/constant/Colors';



function ForgotpasswordScreen(props) {

  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <View style={fstyles.logo}></View>
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 5, width: "80%" }}>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={{ ...styles.h1, textAlign: "center" }} >Şifremi Unuttum</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <Text>Email Adresiniz:</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: Colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"email Adresiniz"}
              onChangeText={(text) => { setEmail(text) }}
              value={email}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={{ ...styles.h5, textAlign: "center" }} >Şifrenizi İnternet sayfası üzerinden değiştirebilirsiniz</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TouchableOpacity style={styles.fillButton}>
              <Text style={styles.fillButtonText}>Şifre Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )




}
const fstyles = StyleSheet.create({
  logo: {
    marginTop: 15,
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 10,
  },

})

export default ForgotpasswordScreen