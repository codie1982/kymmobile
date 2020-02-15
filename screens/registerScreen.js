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
import { Ionicons } from "@expo/vector-icons"


function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setrePassword] = useState('');
  const [acceptprivacyPol, setAcceptprivacyPol] = useState(false);
  const [acceptAd, setAcceptAd] = useState(false);
  return (
    <View style={styles.container} >
      <View style={lstyles.logo}></View>
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 5, width: "80%" }}>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={{ ...styles.h1, textAlign: "center" }} >Kayıt Olun</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: Colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Adınız"}
              onChangeText={(text) => { setName(text) }}
              value={name}
            />
          </View>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: Colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Soy adınız"}
              onChangeText={(text) => { setEmail(text) }}
              value={email}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: Colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"email adresiniz"}
              onChange={(text) => { setEmail(text) }}
              value={email}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: Colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Şifreniz"}
              onChange={(text) => { setPassword(text) }}
              value={password}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: Colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Şifreniz Tekrar"}
              onChange={(text) => { setrePassword(text) }}
              value={repassword}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <View style={styles.row}>
              <Text>Kullanım Koşullarını Kabul ediyorum</Text>
              <CheckBox
                checked={acceptprivacyPol}
                onValueChange={(e) => {
                  setAcceptprivacyPol(acceptprivacyPol === false ? true : false)
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <View style={styles.row}>
              <Text>Mail Gönderilme Koşulunu Kabul ediyorum</Text>
              <CheckBox
                checked={acceptAd}
                onValueChange={(e) => {
                  setAcceptAd(acceptAd === false ? true : false)
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TouchableOpacity style={styles.fillButton}>
              <Text style={styles.fillButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col1}>
            <TouchableOpacity style={styles.borderButton}>
              <Text style={styles.borderButtonText}>Giriş Yap</Text>
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

export default RegisterScreen