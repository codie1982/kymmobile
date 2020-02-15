import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Modal, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import styles from "../assets/styles"
function LoginComponent(props) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const settings = useSelector(state => state.settings)

  const userContext = useContext(props.context)

  const emailHandler = (text) => {
    if (text != "") {
      setEmail(text)
    } else {
      setEmail('')
    }
  }
  const passwordHandler = (text) => {
    if (text != "") {
      setPassword(text)
    } else {
      setPassword('')
    }

  }

  const loginHandler = () => {
    userContext.userDispatch({
      type: "login",
      user_email: email,
      user_password: password,
    })
  }

  return (
    <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center", }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={{ uri: settings.tema_settings.site_logo["500"] }} style={{ width: 155, height: 95 }} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 14, color: props.state == "danger" ? "red" : "green", fontWeight: "500" }}>{props.message}</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 5, width: "80%" }}>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={{ ...styles.h1, textAlign: "center" }} >Giriş Yapın</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <Text>Email Adresiniz:</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 30, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 5 }}
              placeholder={"email Adresiniz"}
              onChangeText={emailHandler}
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
              style={{ minHeight: 30, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 5 }}
              secureTextEntry={true}
              placeholder={"Şifrenizi Yazın"}
              onChangeText={passwordHandler}
              value={password}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TouchableOpacity onPress={loginHandler} style={{ ...styles.fillButton, backgroundColor: props.colors.primary_color }}>
              <Text style={{ ...styles.fillButtonText, color: props.colors.text_color }}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>)
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
export default LoginComponent
