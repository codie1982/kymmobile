import React, { Component, useState, useEffect, } from "react";
import {
  View, Text, Picker, CheckBox, TextInput, TouchableOpacity, AsyncStorage
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import styles from "../assets/styles";
import AdresBlock from "./adresBlock";
import * as customerAction from "../store/actions/customerAction";

function AdresView(props) {
  const customer_adres_data = useSelector(state => state.customer_information.send_customer_adres)
  const error = useSelector(state => state.customer_information.error)
  const server_message = useSelector(state => state.customer_information.message)


  //Adres Input
  const [adresTitle, setOnAdresTitleChangeText] = useState('');
  const [adresPKChangeText, setAdresPKChangeText] = useState('');
  const [adresSKChangeText, setAdresSKChangeText] = useState('');
  const [adresDesChangeText, setAdresDesChangeText] = useState('');

  const [deliveryAdres, setDeliveryAdres] = useState(false);
  const [shippingAdres, setShippingAdres] = useState(false);

  const dispatch = useDispatch()

  const saveAdresHandler = async () => {
    // await dispatch(customerAction.addCustomerAdres(customer_adres_data))

    const _userID = await AsyncStorage.getItem("userID")
    if (_userID == null) {
      alert("Öncelikle Giriş Yapmanız Gereklidir.")
    } else {
      let sendServer = true;
      if (adresTitle == "---") {
        sendServer = false;
        alert("Başlık Giriniz")
      }
      if (customer_adres_data.province == "---") {
        sendServer = false;
        alert("Bir İl Seçimi Yapınız")
      }
      if (customer_adres_data.district == "---") {
        sendServer = false;
        alert("Bir ilçe Seçimi Yapınız")
      }
      if (customer_adres_data.neighborhood == "---") {
        sendServer = false;
        alert("Bir Mahalle Seçimi Yapınız")
      }

      if (sendServer) {
        await dispatch(customerAction.setCustomer_id(_userID))
        await dispatch(customerAction.addCustomerAdres(customer_adres_data))
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
      await dispatch(customerAction.setCustomerTitle(adresTitle))
      await dispatch(customerAction.setCustomerPostCode(adresPKChangeText))
      await dispatch(customerAction.setCustomerStreet(adresSKChangeText))
      await dispatch(customerAction.setCustomerAdresDescription(adresDesChangeText))
      await dispatch(customerAction.setCustomerDeliveryAdres(deliveryAdres))
      await dispatch(customerAction.setCustomerShippingAdres(shippingAdres))
    }
    setAd();
  }, [adresTitle, adresPKChangeText, adresSKChangeText, adresDesChangeText, deliveryAdres, shippingAdres])

  return (

    <View style={{ alignItems: "center", justifyContent: "center", marginTop: 22 }}>
      <View style={styles.modalContent}>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={styles.jobTitle} >Başlık</Text></View>
          <View style={styles.col3}>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.text_color, borderWidth: 0.5, padding: 10 }}
              placeholder={"Ev Adresi vd iş Adresi"}
              onChangeText={(text) => { setOnAdresTitleChangeText(text) }}
              value={adresTitle}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <View style={{ ...styles.checkBox }}>
              <Text>Teslimat Adresi</Text>
              <CheckBox
                value={deliveryAdres}
                onChange={() => setDeliveryAdres(!deliveryAdres)}
              />
            </View>
          </View>
          <View style={styles.col1}>
            <View style={{ ...styles.checkBox }}>
              <Text>Fatura Adresi</Text>
              <CheckBox
                onChange={() => setShippingAdres(!shippingAdres)}
                value={shippingAdres}
              />
            </View>
          </View>
        </View>
        <AdresBlock />
        <View style={styles.row}>
          <View style={styles.col1}>
            <Text style={styles.jobTitle}>Posta Kodu</Text>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.text_color, borderWidth: 0.5, padding: 10 }}
              onChangeText={(text) => { setAdresPKChangeText(text) }}
              value={adresPKChangeText}
            />
          </View>
          <View style={styles.col1}>
            <Text style={styles.jobTitle} >Sokak Numarası</Text>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.text_color, borderWidth: 0.5, padding: 10 }}
              onChangeText={(text) => { setAdresSKChangeText(text) }}
              value={adresSKChangeText}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <Text style={styles.jobTitle}>Adresiniz</Text>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.text_color, borderWidth: 0.5, padding: 10 }}
              multiline={true}
              numberOfLines={6}
              onChangeText={(text) => { setAdresDesChangeText(text) }}
              value={adresDesChangeText} />
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableOpacity onPress={saveAdresHandler}
            style={{
              borderRadius: 5, backgroundColor: props.colors.primary_color,
              justifyContent: "center", alignContent: "center", width: "50%",
              padding: 10, marginRight: 5
            }}>
            <Text style={{
              color: props.colors.text_color, fontSize: 16,
              fontWeight: "500", textAlign: "center", lineHeight: 22
            }}>Adresi Kaydet</Text>
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

export default AdresView
