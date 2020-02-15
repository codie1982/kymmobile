import React, { useState, useEffect } from "react";
import {
  View, Text, Picker, TextInput, TouchableOpacity, AsyncStorage
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import styles from "../assets/styles";

import * as customerAction from "../store/actions/customerAction";



function PhoneView(props) {
  //Kredi Kartı
  const customer_phone_data = useSelector(state => state.customer_information.send_customer_phone)
  const error = useSelector(state => state.customer_information.error)
  const server_message = useSelector(state => state.customer_information.message)

  const [phoneType, setPhoneType] = useState("cell")
  const [areaCode, setAreaCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const dispatch = useDispatch()

  const savePhonedHandler = async () => {
    const _userID = await AsyncStorage.getItem("userID")
    if (_userID == null) {
      alert("Öncelikle Giriş Yapmanız Gereklidir.")
    } else {
      let sendServer = true;

      if (phoneType == "---") {
        sendServer = false;
        alert("Telefon Tipini Seçiniz")
      }
      if (areaCode == "") {
        sendServer = false;
        alert("Alan Kodu Kısmını Boş Bırakmayınız")
      }
      if (phoneNumber == "") {
        sendServer = false;
        alert("Telefon Numarası Kısmını Boş Bırakmayınız")
      }

      if (sendServer) {
        await dispatch(customerAction.setCustomer_id(_userID))
        await dispatch(customerAction.addCustomerPhoneNumber(customer_phone_data))
        props.modalClose()
      }
    }
  }

  useEffect(() => {
    if (error) {
      alert(server_message)
    }
  }, [dispatch, error, server_message])
  useEffect(() => {
    const setAd = async () => {
      await dispatch(customerAction.setCustomerPhoneAreaCode(areaCode))
      await dispatch(customerAction.setCustomerPhoneType(phoneType))
      await dispatch(customerAction.setCustomerPhoneNumber(phoneNumber))
    }
    setAd();
  }, [phoneType, areaCode, phoneNumber])

  return (
    <View style={{ flex:1,alignItems: "center", justifyContent: "center", marginTop: 22 }}>
      <View style={styles.modalContent}>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={styles.jobTitle} >Telefon Bilgilerinizi Giriniz</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.col2}>
            <Picker style={styles.picker}
              selectedValue={phoneType}
              onValueChange={(itemValue) => setPhoneType(itemValue)}
            >
              <Picker.Item label="Telefon Tipi" value={"---"} />
              <Picker.Item label="Cep" value={"cell"} />
              <Picker.Item label="Sabit Telefon" value={"land"} />
              <Picker.Item label="Fax" value={"fax"} />
            </Picker>
          </View>
          <View style={styles.col3}>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Alan Kodu 0212"}
              onChangeText={(text) => { setAreaCode(text) }}
              value={areaCode}
            />
          </View>
          <View style={styles.col3}>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Telefon Numarası"}
              onChangeText={(text) => { setPhoneNumber(text) }}
              value={phoneNumber}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", width: "100%",marginTop:20}}>
          <TouchableOpacity onPress={savePhonedHandler}
            style={{
              borderRadius: 5, backgroundColor: props.colors.primary_color,
              justifyContent: "center", alignContent: "center", width: "50%",
              padding: 10, marginRight: 5
            }}>
            <Text style={{
              color: props.colors.text_color, fontSize: 16,
              fontWeight: "500", textAlign: "center", lineHeight: 22
            }}>Telefon Numarasını Kaydet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.modalClose}
            style={{
              borderRadius: 5, backgroundColor: props.colors.primary_color,
              justifyContent: "center", alignContent: "center", width: "50%",
              padding: 10, marginLeft: 5
            }}>
            <Text style={{
              color: props.colors.text_color, fontSize: 16,
              fontWeight: "500", textAlign: "center", lineHeight: 22
            }}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}

export default PhoneView
