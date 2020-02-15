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



function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [rememeber, setRemberme] = useState(false);
    return (
    <View style={styles.container}>
      <View style={lstyles.logo}></View>
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 5, width: "80%" }}>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={{ ...styles.h1, textAlign: "center" }} >Kayıt Olun</Text></View>
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
          <View style={styles.col1}>
            <Text>Şifreniz:</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: Colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Şifreniz Adresiniz"}
              onChange={(text) => { setEmail(text) }}
              value={email}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <View style={styles.row}>
              <Text>Beni Hatırla</Text>
              <CheckBox
                checked={rememeber}
                onValueChange={(e) => {
                  setRemberme(rememeber === false ? true : false)
                  //console.log(e)
                  //console.log(rememeber)
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TouchableOpacity style={styles.fillButton}>
              <Text style={styles.fillButtonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col1}>
            <TouchableOpacity style={styles.borderButton}>
              <Text style={lstyles.borderButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )

}
const lstyles = StyleSheet.create({
  logo: {
    marginTop: 15,
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 10,
  },

})
export default LoginScreen