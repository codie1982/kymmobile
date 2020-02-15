import React, { useState, useEffect, } from "react";
import {
  View, Text, Picker, TextInput, TouchableOpacity, AsyncStorage
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import styles from "../assets/styles";

import * as customerAction from "../store/actions/customerAction";



function CardView(props) {
  //Kredi Kartı
  const customer_card_data = useSelector(state => state.customer_information.send_customer_credicard)
  const error = useSelector(state => state.customer_information.error)
  const server_message = useSelector(state => state.customer_information.message)

  const [cardTitle, setCardTitle] = useState('');
  const [lastMonth, setLastMonth] = useState('---');
  const [lastYear, setLastYear] = useState('---');
  const [cardNumber, setcardNumber] = useState('');
  const [cardSecurtyNumber, setcardSecurtyNumber] = useState('');

  const dispatch = useDispatch()

  const saveCardHandler = async () => {
    const _userID = await AsyncStorage.getItem("userID")
    if (_userID == null) {
      alert("Öncelikle Giriş Yapmanız Gereklidir.")
    } else {
      let sendServer = true;
      if (cardTitle == "---") {
        sendServer = false;
        alert("Başlık Giriniz")
      }
      if (lastMonth == "---") {
        sendServer = false;
        alert("Son Kullanma Ayını Seçiniz")
      }
      if (lastYear == "---") {
        sendServer = false;
        alert("Son Kullanma Yılını Seçiniz")
      }
      if (cardNumber == "---") {
        sendServer = false;
        alert("Kart Numarası Alanını Boş Bırakmayınız")
      }
      if (cardSecurtyNumber == "---") {
        sendServer = false;
        alert("Güvenlik Numarası Alanını Boş Bırakmayınız")
      }
      if (cardNumber.length != 16) {
        sendServer = false;
        alert("Kredi Kart Numarası 16 Haneli Girilmesi Gerekmektedir.")
      }
      if (cardSecurtyNumber.length != 3) {
        sendServer = false;
        alert("Güvenlik Numarası 3 Haneli Girimesi Gerekmektedir.")
      }

      if (sendServer) {
        await dispatch(customerAction.setCustomer_id(_userID))
        await dispatch(customerAction.addCustomerCrediCard(customer_card_data))
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
      await dispatch(customerAction.setCustomerCredicardTitle(cardTitle))
      await dispatch(customerAction.setCustomerCrediCardMonth(lastMonth))
      await dispatch(customerAction.setCustomerCrediCardYear(lastYear))
      await dispatch(customerAction.setCustomerCrediCardNumber(cardNumber))
      await dispatch(customerAction.setCustomerCrediCardSecurtyNumber(cardSecurtyNumber))
    }
    setAd();
  }, [cardTitle, lastMonth, lastYear, cardNumber, cardSecurtyNumber])

  return (
    <View style={{ alignItems: "center", justifyContent: "center", marginTop: 22 }}>
      <View style={styles.modalContent}>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={styles.jobTitle} >Kart Sahibinin Adı Soyadı</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Engin Erol"}
              onChangeText={(text) => { setCardTitle(text) }}
              value={cardTitle}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}>
            <Picker style={styles.picker}
              selectedValue={lastYear}
              onValueChange={(itemValue) =>
                setLastYear(itemValue)
              }
            >
              <Picker.Item label="Son Kullanma Tarihi Yıl" value={"---"} />
              <Picker.Item label="2019" value={2019} />
              <Picker.Item label="2020" value={2020} />
              <Picker.Item label="2021" value={2021} />
              <Picker.Item label="2022" value={2022} />
              <Picker.Item label="2023" value={2023} />
              <Picker.Item label="2024" value={2024} />
              <Picker.Item label="2025" value={2025} />
              <Picker.Item label="2026" value={2026} />

            </Picker>
          </View>
          <View style={styles.col1}>
            <Picker style={styles.picker}
              selectedValue={lastMonth}
              onValueChange={(itemValue) =>
                setLastMonth(itemValue)
              }
            >
              <Picker.Item label="Son Kullanma Tarihi Ay" value={"---"} />
              <Picker.Item label="01" value={1} />
              <Picker.Item label="02" value={2} />
              <Picker.Item label="03" value={3} />
              <Picker.Item label="04" value={4} />
              <Picker.Item label="05" value={5} />
              <Picker.Item label="06" value={6} />
              <Picker.Item label="07" value={7} />
              <Picker.Item label="08" value={8} />
              <Picker.Item label="09" value={9} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="11" value={11} />
              <Picker.Item label="12" value={12} />
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col3}>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Kart Numarası"}
              onChangeText={(text) => {
                if (text.length >= 16) {
                  setcardNumber(text.substr(0, 16))
                } else {
                  setcardNumber(text)
                }
              }}
              value={cardNumber}
            />
          </View>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.textColor, borderWidth: 0.5, padding: 10 }}
              placeholder={"Güvenlik Kodu"}
              onChangeText={(text) => {
                if (text.length >= 3) {
                  setcardSecurtyNumber(text.substr(0, 3))
                } else {
                  setcardSecurtyNumber(text)
                }

              }}
              value={cardSecurtyNumber}
            />
          </View>
        </View>


        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableOpacity onPress={saveCardHandler}
            style={{
              borderRadius: 5, backgroundColor: props.colors.primary_color,
              justifyContent: "center", alignContent: "center", width: "50%",
              padding: 10, marginRight: 5
            }}>
            <Text style={{
              color: props.colors.text_color, fontSize: 16,
              fontWeight: "500", textAlign: "center", lineHeight: 22
            }}>Kart Bilgisi Kaydet</Text>
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

export default CardView
