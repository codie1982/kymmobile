import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, CheckBox, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import styles from "../assets/styles"
function RegisterComponent(props) {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setrePassword] = useState('');
  const [acceptprivacyPol, setAcceptprivacyPol] = useState(false);
  const [acceptAd, setAcceptAd] = useState(false);
  const settings = useSelector(state => state.settings)
  const userContext = useContext(props.context)


  const nameHandler = (text) => {
    if (text != "") {
      setName(text)
    } else {
      setName('')
    }
  }

  const lastnameHandler = (text) => {
    if (text != "") {
      setLastName(text)
    } else {
      setLastName('')
    }
  }
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
  const repasswordHandler = (text) => {
    if (text != "") {
      setrePassword(text)
    } else {
      setrePassword('')
    }
  }

  const registerHandler = () => {
    userContext.userDispatch({
      type: "register",
      user_name: name,
      user_lastname: lastname,
      user_email: email,
      user_password: password,
      user_repassword: repassword,
      privacy_policy: acceptprivacyPol,
      advertisement: acceptAd,
    })
  }
  return (
    <View style={{ flex:1, width: "100%", alignItems: "center", justifyContent: "center", }} >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={{ uri: settings.tema_settings.site_logo["500"] }} style={{ width: 155, height: 95, marginTop: 5 }} />
      </View>
      <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
        <Text style={{ fontSize: 14, color: props.state == "danger" ? "red" : "green", fontWeight: "500" }}>{props.message}</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 5, width: "80%" }}>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={{ ...styles.h1, textAlign: "center" }} >Kayıt Olun</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 30, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 5 }}
              placeholder={"Adınız"}
              onChangeText={nameHandler}
              value={name}
            />
          </View>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 30, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 5 }}
              placeholder={"Soy adınız"}
              onChangeText={lastnameHandler}
              value={lastname}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 30, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 5 }}
              placeholder={"Email adresiniz"}
              onChangeText={emailHandler}
              value={email}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 30, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 5 }}
              secureTextEntry={true}
              placeholder={"Şifreniz"}
              onChangeText={passwordHandler}
              value={password}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 30, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 5 }}
              secureTextEntry={true}
              placeholder={"Şifreniz Tekrar"}
              onChangeText={repasswordHandler}
              value={repassword}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <View style={styles.row}>
              <Text>Kullanım Koşullarını Kabul ediyorum</Text>
              <CheckBox
                value={acceptprivacyPol}
                onValueChange={(e) => {
                  setAcceptprivacyPol(!acceptprivacyPol)
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
                value={acceptAd}
                onValueChange={(e) => {
                  setAcceptAd(!acceptAd)
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TouchableOpacity onPress={registerHandler} style={{ ...styles.fillButton, backgroundColor: props.colors.primary_color }}>
              <Text style={{ ...styles.fillButtonText, color: props.colors.text_color }}>Kayıt Ol</Text>
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
export default RegisterComponent
