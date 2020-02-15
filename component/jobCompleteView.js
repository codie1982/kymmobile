import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, AsyncStorage, YellowBox
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import styles from "../assets/styles";

import { Ionicons } from "@expo/vector-icons"

import * as jobAction from "../store/actions/jobAction";
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';
YellowBox.ignoreWarnings(['Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?']);
//YellowBox.ignoreWarnings(['Remote debugger']);

function JobCompleteView(props) {
  const application_detail = useSelector(state => state.info)
  const socket_adres = application_detail.info.protocol + "://" + application_detail.info.ipnumber + ":" + application_detail.info.portnumber
  const [socket, setSocket] = useState(io(socket_adres))

  const job_product_list = useSelector(state => state.jobInfo.job_product_list)
  const job_complete_data = useSelector(state => state.jobInfo.job_complete_data)
  const adding = useSelector(state => state.jobInfo.adding)

  const send_socket = useSelector(state => state.jobInfo.send_socket)

  const job_complete_process = useSelector(state => state.jobInfo.job_complete_process)
  const job_complete_message = useSelector(state => state.jobInfo.message)
  const complete_error = useSelector(state => state.jobInfo.complete_error)
  const product_count = job_product_list.length
  const total_price_fixed = useSelector(state => state.jobInfo.total_price_fixed)
  const total_price_unit = useSelector(state => state.jobInfo.total_price_unit)

  const customer_information = useSelector(state => state.customer_information)
  const customer_credicard_list = customer_information.customer_credi_card_list
  const selected_customer_credi_card = customer_credicard_list.find(item => item.customer_credi_card_id == job_complete_data.credi_card);
  const [jobNotes, setjobNotes] = useState('');

  const Payment_method_text = () => {
    if (job_complete_data.payment_method == "KK") {
      return (
        <View style={styles.row}>
          <View style={styles.col1}>
            <Text>{`Ödeme Yöntemi : ${selected_customer_credi_card.credicard_title} adına kayıtlı Kredi Kartı ile`}</Text>
          </View>
        </View>
      )
    } else if (job_complete_data.payment_method == "KO") {
      return (
        <View style={styles.row}>
          <View style={styles.col1}>
            <Text>{`Ödeme Yöntemi : Kapıda Ödeme Seçeni ile`}</Text>
          </View>
        </View>
      )
    }
  }
  const Payment_method_extra_price_text = () => {
    if (job_complete_data.extra_price != 0) {
      if (job_complete_data.payment_method == "KK") {
        return (
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text style={{ color: "red" }}>{`Kredi Kartı ödemelerinde +${job_complete_data.extra_price.toFixed(2)} TL extra bedel alınmaktadır.`} </Text>
            </View>
          </View>
        )
      } else if (job_complete_data.payment_method == "KO") {
        return (
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text style={{ color: "red" }}>{`Kapıda Ödeme Yönteminde +${job_complete_data.extra_price.toFixed(2)} TL extra bedel alınmaktadır.`} </Text>
            </View>
          </View>
        )
      }
    } else {
      return false
    }
  }

  const Delivery_method_text = () => {
    if (job_complete_data.selected_delivery_method == "messenger") {
      return (
        <View style={styles.row}>
          <View style={styles.col1}><Text>Gönrderim : Kurye İle </Text></View>
        </View>
      )
    } else if (job_complete_data.selected_delivery_method == "cargo") {
      return (
        <View style={styles.row}>
          <View style={styles.col1}><Text>Gönrderim : Kargo İle </Text></View>
        </View>
      )
    } else if (job_complete_data.selected_delivery_method == "transport") {
      return (
        <View style={styles.row}>
          <View style={styles.col1}><Text>Gönrderim : Nakliye İle </Text></View>
        </View>
      )
    } else {
      return false
    }

  }
  const Delivery_method_extra_price_text = () => {
    if (job_complete_data.delivery_price != 0) {
      return (
        <View style={styles.row}>
          <View style={styles.col1}><Text style={{ color: "red" }}>{`Gönderim ücreti olarak +${job_complete_data.delivery_price} ${job_complete_data.delivery_price_unit}  alınmaktadır`}</Text></View>
        </View>
      )
    } else {
      return false;
    }
  }
  const Location_extra_price_text = () => {
    if (job_complete_data.location_price != 0) {
      if (job_complete_data.location_price < 0) {
        return (
          <View style={styles.row}>
            <View style={styles.col1}><Text style={{ color: "green" }}>{`Bulunduğunuz adres için  ${job_complete_data.location_price.toFixed(2)} ${job_complete_data.delivery_price_unit} indirim oluşturulmaktadır.`} </Text></View>
          </View>
        )
      } else {
        return (
          <View style={styles.row}>
            <View style={styles.col1}><Text style={{ color: "red" }}>{`Bulunduğunuz adres için  +${job_complete_data.location_price.toFixed(2)} ${job_complete_data.delivery_price_unit} fark alınmaktadır.`} </Text></View>
          </View>
        )
      }
    } else {
      return false;
    }
  }
  const dispatch = useDispatch();
  const jobCompleteHandler = async () => {

    const userid = await AsyncStorage.getItem("userID")
    job_complete_data["user_id"] = userid
    job_complete_data["job_note"] = jobNotes
    await dispatch(jobAction.adding(true))
    await dispatch(jobAction.jobComplete(job_complete_data))
    await dispatch(jobAction.adding(false))


  }

  const jobCompleteOk = () => {
    props.modalClose()
  }
  const jobCompleteWindowClose = () => {
    props.modalClose()
  }
  useEffect(() => {


    if (send_socket) {

      socket.emit("update", { addjob: true })
    }
  }, [send_socket])

  if (adding)
    return <ActivityIndicator style={{ flex: 1, alignItems: "center", justifyContent: "center" }} />

  if (job_complete_process) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View>
          {complete_error ?
            <Ionicons name={'ios-close-circle-outline'} size={90} color={"red"} />
            :
            <Ionicons name={'ios-checkmark-circle-outline'} size={90} color={"green"} />
          }
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }} >{job_complete_message}</Text>
        </View>


        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity onPress={jobCompleteOk}
            style={{
              borderRadius: 5, backgroundColor: props.colors.primary_color,
              justifyContent: "center", alignItems: "center", width: "50%",
              padding: 10, marginRight: 5
            }}>
            <Text style={{
              color: props.colors.text_color, fontSize: 16,
              fontWeight: "500", textAlign: "center", lineHeight: 22
            }}>Tamam</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center", marginTop: 22 }}>
      <View style={styles.modalContent}>
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-end", alignItems: "flex-end", }}>
          <TouchableOpacity onPress={jobCompleteWindowClose}
            style={{
              borderRadius: 5, backgroundColor: props.colors.primary_color,
              justifyContent: "center", alignItems: "center",
              padding: 10, marginRight: 5, width: 40, height: 40
            }}>
            <Text style={{
              color: props.colors.text_color, fontSize: 16,
              fontWeight: "500", textAlign: "center", lineHeight: 22
            }}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column", height: "65%" }}>
          <View style={{ flex: 1 }}>
            <ScrollView style={{ width: "100%" }}>
              <View style={styles.row}>
                <View style={styles.col1}><Text style={{ fontSize: 16, lineHeight: 22, fontWeight: "500" }} >Siparişiniz :</Text></View>
              </View>
              <View style={styles.row}>
                <View style={styles.col1}><Text>{`Sipariş listenizte toplam ${product_count} ürün bulunuyor`}</Text></View>
              </View>
              <View style={styles.row}>
                <View style={styles.col3}><Text>Ürünler Toplamı </Text></View>
                <View style={styles.col1}><Text>:</Text></View>
                <View style={styles.col1}><Text style={{ fontWeight: "700" }}>{total_price_fixed} {total_price_unit}</Text></View>
              </View>
              <Payment_method_text />
              <Payment_method_extra_price_text />
              <Delivery_method_text />
              <Delivery_method_extra_price_text />
              <Location_extra_price_text />
              <View style={styles.row}>
                <View style={styles.col3}><Text>Sipariş Toplamı </Text></View>
                <View style={styles.col1}><Text>:</Text></View>
                <View style={styles.col1}><Text style={{ fontWeight: "700" }}>{job_complete_data.job_price} {job_complete_data.delivery_price_unit}</Text></View>
              </View>
              <View style={styles.row}>
                <View style={styles.col1}><Text>Siparişi onaylamadan önce eklemek istediğiniz bir not var ise bize yazabilirsiniz </Text></View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col1}><Text style={styles.jobTitle} >Not Ekle</Text></View>
        </View>
        <View style={{ ...styles.row, marginTop: 20 }}>
          <View style={styles.col1}>
            <TextInput
              style={{ minHeight: 40, borderColor: props.colors.text_color, borderWidth: 0.5, padding: 10 }}
              placeholder={"Siparişinize Not Ekleyin"}
              onChangeText={(text) => { setjobNotes(text) }}
              value={jobNotes}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity onPress={jobCompleteHandler}
            style={{
              borderRadius: 5, backgroundColor: props.colors.primary_color,
              justifyContent: "center", alignItems: "center", width: "50%",
              padding: 10, marginRight: 5
            }}>
            <Text style={{
              color: props.colors.text_color, fontSize: 16,
              fontWeight: "500", textAlign: "center", lineHeight: 22
            }}>Siparişini Tamamla</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default JobCompleteView
