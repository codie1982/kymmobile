import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, Picker,
  ScrollView, StyleSheet,
  SafeAreaView,
  TouchableOpacity, Modal, Alert,
  AsyncStorage, FlatList, ActivityIndicator
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../component/HeaderButton';

import styles from "../assets/styles"
import { Ionicons } from "@expo/vector-icons"

import AdresView from "../component/adresView";
import CardView from "../component/cardView";
import PhoneView from "../component/phoneView";
import JobCompleteView from "../component/jobCompleteView";

import CardItem from "../component/CardItem"
import JobList from "../component/jobList"
import * as jobAction from "../store/actions/jobAction"

import * as BasicFunctions from "../function/basic"




function BasketScreen(props) {
  const [adresModal, setAdresModal] = useState(false)
  const [cardModal, setCardModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false)
  const [jobCompleteModal, setJobCompleteModal] = useState(false);
  //const isactivator = props.navigation.getParam("isactivator")

  const application_detail = useSelector(state => state.info)
  const application_settings = useSelector(state => state.settings)
  const job_settings = useSelector(state => state.settings.settings.job_settings)
  const delivery_settings = useSelector(state => state.settings.settings.delivery_settings)
  const customer_information = useSelector(state => state.customer_information)
  const favorite_product_list = useSelector(state => state.products.favorite_product_list)

  const isjobLoading = useSelector(state => state.jobInfo.jobloading)
  const job_total_price = useSelector(state => state.jobInfo.job_total_price)
  const total_price_fixed = useSelector(state => state.jobInfo.total_price_fixed)
  const total_price_unit = useSelector(state => state.jobInfo.total_price_unit)
  const job_product_list = useSelector(state => state.jobInfo.job_product_list)


  const [Colors, setColors] = useState({})
  const [customerAdres, setCustomerAdres] = useState()
  const [customerPhone, setCustomerPhone] = useState()
  const [customerPaymentMethod, setCustomerPaymentMethod] = useState()
  const [customerCrediCard, setCustomerCrediCard] = useState()
  const [attthedooroptions, setAttthedooroptions] = useState()

  const [payment_method, setPaymentMethod] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(jobAction.isjobloading(false))
    dispatch(jobAction.setStatus(false))
    setColors({ primary_color: application_detail.info.primary_color, text_color: application_detail.info.text_color })
    if (typeof job_settings.payment_method != "undefined") {
      setPaymentMethod(job_settings.payment_method);
    }
  }, [])



  const cardItem = itemData => {
    return (<CardItem
      colors={Colors}
      id={itemData.item.job_product_id}
      title={itemData.item.product_title}
      subtitle={itemData.item.product_sub_title}
      price={itemData.item.job_product_price_fixed}
      unit={itemData.item.job_product_price_unit}
      amount={itemData.item.amount}
      options={itemData.item.options}
    />)
  }

  const [addJobModalVisible, setAddJobModalVisible] = useState(false);
  //Jon Notes Input
  const customer_adres_list = customer_information.customer_adress_list
  const customer_phone_list = customer_information.customer_phone_list
  const customer_credicard_list = customer_information.customer_credi_card_list


  const openAdresModal = () => setAdresModal(true);
  const openCardModal = () => setCardModal(true);
  const openPhoneModal = () => setPhoneModal(true);
  const openJobCompleteModal = () => setJobCompleteModal(true);


  const refreshHandler = useCallback(() => {
    const reloadJob = async () => {
      dispatch(jobAction.isjobloading(true))
      const _jobID = await AsyncStorage.getItem('jobID');
      const _userID = await AsyncStorage.getItem('userID');

      await dispatch(jobAction.getJobDetails(_jobID, _userID))
      dispatch(jobAction.isjobloading(false))
    }
    reloadJob();
  }, [dispatch, job_product_list])

  const trashHandler = useCallback(() => {
    Alert.alert(
      'Sipariş Kaldırılma İşlemi?',
      'Sipariş Kartını Boşaltmak istediğinizden Eminmisiniz?',
      [
        {
          text: 'Kaldır', onPress: async () => {
            dispatch(jobAction.isjobloading(true))
            const _jobID = await AsyncStorage.getItem('jobID');
            const _userID = await AsyncStorage.getItem('userID');
            await dispatch(jobAction.removeJob(_jobID, _userID))
            dispatch(jobAction.isjobloading(false))
          }, style: 'ok',
        },
        {
          text: 'İptal',
          onPress: async () => console.log("İptal Edildi"),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );


  }, [dispatch, job_product_list])

  useEffect(() => {
    props.navigation.setParams({ refresh: refreshHandler, trash: trashHandler })
  }, [refreshHandler, trashHandler])

  useEffect(() => {
  }, [customer_adres_list])

  const adresModalCloseHandler = () => {
    setAdresModal(false)
  }

  const cardModalCloseHandler = () => {
    setCardModal(false)
  }
  const phoneModalCloseHandler = () => {
    setPhoneModal(false)
  }

  const jobCompleteModalCloseHandler = () => {
    setJobCompleteModal(false)
  }

  const completeJob = async () => {
    let jobOk = true

    await dispatch(jobAction.jobCompleteProsses(false));


    const jobID = await AsyncStorage.getItem("jobID");
    if (jobID == null) {
      alert("Öncelikle Sipariş Kartınıza Bir Ürün Eklemeyi deneyin")
    } else {
      if (typeof customerPaymentMethod == "undefined") {
        jobOk = false;
        alert("Bir Ödeme Methodu Seçiniz")
        return false;
      }

      if (customerPaymentMethod == "KK") {
        if (typeof customerCrediCard == "undefined") {
          jobOk = false;
          alert("Ödeme İçin Bir Kredi Kartı Seçiniz")
          return false;
        }
      }
      if (typeof customerAdres == "undefined") {
        jobOk = false;
        alert("Bir Gönderim Adresi Seçiniz")
        return false;
      }

      if (typeof customerPhone == "undefined") {
        jobOk = false;
        alert("Bir Telefon Numarası Seçiniz")
        return false;
      }

      const customer_adres_data = customer_adres_list.find((item) => item.customer_adres_id == customerAdres);
      const customer_adres = {
        province: customer_adres_data.adres_id.province_id,
        district: customer_adres_data.adres_id.district_id,
        neighborhood: customer_adres_data.adres_id.neighborhood_id
      }

      const selected_payment_method = payment_method.methods.find(item => item.short_title == customerPaymentMethod)
      let ff;

      if (delivery_settings.location_price) {
        ff = BasicFunctions.whereIsLocation(delivery_settings.locations, customer_adres);
        if (job_settings.job_limit_delivery_location) {
          if (ff.state) {
            //Seçilen Lokasyona İlişkin versa extra Arttırım veya Azaltım Oluşturmamız gerekmektedir.
          } else {
            //Sınırlama Varsa İşi Onaylamamız gerekmektedir..
            alert("Seçilen Lokasyona Gönderim Bulunmamaktadır.")
            jobOk = false;
            return false;
          }
        } else {
          if (ff.state) {
            //Seçilen Lokasyona İlişkin versa extra Arttırım veya Azaltım Oluşturmamız gerekmektedir.
          }
        }
      }
      const job_data = {};

      job_data["job_id"] = jobID;
      job_data["selected_payment_method"] = customerPaymentMethod;
      job_data["selected_payment_method_extra_price"] = BasicFunctions.calculatePaymentExtraPrice(job_total_price, selected_payment_method);
      job_data["selected_payment_method_extra_price_unit"] = selected_payment_method.unit;

      if (customerPaymentMethod == "KK") {
        job_data["selected_credi_card"] = customerCrediCard;
      }
      if (customerPaymentMethod == "KO") {
        job_data["selected_atthedor_options"] = attthedooroptions;
      }

      job_data["selected_delivery_method_type"] = delivery_settings.delivery_type;
      job_data["selected_delivery_method_text"] = BasicFunctions.get_delivery_method_type(delivery_settings.delivery_type);
      job_data["selected_delivery_price"] = delivery_settings.delivery_price_fixed;
      job_data["selected_delivery_price_unit"] = delivery_settings.delivery_price_unit;
      if (ff.state)
        job_data["selected_delivery_location_price"] = BasicFunctions.calculateDeliveryLocation(job_total_price, ff.founded_delivery_location);

      job_data["selected_customer_adres"] = customerAdres;

      job_data["selected_customer_phone"] = customerPhone;
      //price, payment_method, delivery_price, location_price
      job_data["job_price"] = BasicFunctions.calculateTotalJobPrice(
        job_total_price,
        job_data["selected_payment_method_extra_price"],
        job_data["selected_delivery_price"],
        job_data["selected_delivery_location_price"]
      );

      // const _job_data = {
      //   job_id: jobID,
      //   selected_payment_method: customerPaymentMethod,
      //   selected_payment_method_extra_price: customerPaymentMethod,
      //   selected_payment_method_extra_price_unit: customerPaymentMethod,
      //   selected_credi_card: customerCrediCard,
      //   selected_delivery_method: BasicFunctions.get_delivery_method_type(delivery_settings.delivery_type),
      //   selected_delivery_price: delivery_settings.delivery_price_fixed,
      //   selected_delivery_price_unit: delivery_settings.delivery_price_unit,
      //   selected_delivery_location_price: BasicFunctions.calculateDeliveryLocation(job_total_price, ff.founded_delivery_location),
      //   selected_customer_adres: customerAdres,
      //   selected_customer_phone: customerPhone,
      // }


      //console.log("job_data",job_data)
      await dispatch(jobAction.set_job_complete_data(job_data))

      if (jobOk) {
        openJobCompleteModal(true);
      }
    }
    //İş IDsi Oluşmuşmu
    //Ödeme Yöntemi Seçilimi
    //Ödeme Yöntemi Kredi Kartı ise Kredi Kartı Seçilimi
    //Adres Seçilimi
    //iş ayarlarında bir lokasyon sınırlaması vermı
    //varsa seçili lokasyon sınırın içindemi değilmi

  }
  //if (isactivator) {
  // return <ActivityIndicator style={{ flex: 1, alignItems: "center", justifyContent: "center" }} />
  //}
  return (
    <SafeAreaView>
      <View style={nstyles.container}>
        <View style={{ ...nstyles.content, }}>
          <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
            <View style={styles.col1}><Text style={{ ...styles.jobTitle, color: "#111" }} >Hesap Özeti</Text></View>
            <View style={styles.col2}><Text style={{ ...styles.jobTitle, color: "#111" }} >Toplam : {total_price_fixed} {total_price_unit}</Text></View>
          </View>
          <ScrollView style={{ width: "100%", height: "30%" }}>
            {isjobLoading
              ?
              <ActivityIndicator style={{ flex: 1, height: 150, alignItems: "center", justifyContent: "center" }} />
              :
              <View>
                {job_product_list.length != 0
                  ?
                  <View style={styles.description}>
                    <FlatList
                      data={job_product_list}
                      keyExtractor={(item) => item.job_product_id}
                      renderItem={cardItem}
                      style={{ width: "100%" }}
                    >
                    </FlatList>
                  </View>
                  :
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <JobList
                      navigation={props.navigation} colors={Colors} data={favorite_product_list}
                      title={""}
                      negatif_answer={"Sisteme Öne Çıkan Ürün Eklenmemiştir"} />
                  </View>}


              </View>
            }
          </ScrollView>
          <View style={{ width: "100%", height: "60%" }}>
            {/* <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
              <View style={styles.col1}>
                <View style={styles.col1}><Text style={styles.jobTitle} >Seçimleri Yapın</Text></View>
              </View>
            </View> */}
            {/* Yeni Adres Ekle Modal  */}
            <Modal animationType="slide" visible={adresModal}><AdresView colors={Colors} modalClose={adresModalCloseHandler} /></Modal>
            <View style={{ ...styles.section, borderColor: Colors.primary_color }}>
              <View style={styles.col3}>
                {typeof customer_adres_list != "undefined" ?
                  <Picker onValueChange={(item) => setCustomerAdres(item)} selectedValue={customerAdres} style={styles.picker}>
                    <Picker.Item label={typeof customer_adres_list != "undefined" ? "Bir Adres Ekleyin" : "Adres Seçin"} value={"---"} />
                    {typeof customer_adres_list != "undefined" ? customer_adres_list.map(
                      (item, index) =>
                        <Picker.Item key={index} label={item.adres_title} value={item.customer_adres_id} />
                    ) : null}
                  </Picker>
                  : null}
              </View>
              <View style={{ ...styles.col1, alignItems: "center" }}>
                <TouchableOpacity style={{ ...styles.fillButton, backgroundColor: Colors.primary_color }} onPress={openAdresModal} >
                  <Ionicons style={{ ...styles.fillButtonText, color: Colors.text_color }} name={"ios-add-circle-outline"}></Ionicons>
                  <View ></View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Yeni Telefon Numarası Ekle Modal  */}
            <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
              <Modal animationType="slide" visible={phoneModal}><PhoneView colors={Colors} modalClose={phoneModalCloseHandler} /></Modal>
              <View style={styles.col3}>
                {typeof customer_phone_list != "undefined" ?
                  <Picker onValueChange={(item) => setCustomerPhone(item)} selectedValue={customerPhone} style={styles.picker}>
                    <Picker.Item label={typeof customer_phone_list != "undefined" ? "Bir Telefon Numarası Seçin " : "Telefon Numarsı Ekleyin "} value={"---"} />
                    {typeof customer_phone_list != "undefined" ? customer_phone_list.map(
                      (item, index) =>
                        <Picker.Item key={index} label={"0" + item.area_code + " " + item.phone_number} value={item.customer_phone_id} />
                    ) : null}
                  </Picker>
                  : null}
              </View>
              {/*ADD PHONE BUTTON*/}
              <View style={{ ...styles.col1, alignItems: "center" }}>
                <TouchableOpacity style={{ ...styles.fillButton, backgroundColor: Colors.primary_color }}
                  onPress={openPhoneModal}>
                  <Ionicons style={{ ...styles.fillButtonText, color: Colors.text_color }} name={"ios-add-circle-outline"}></Ionicons>
                </TouchableOpacity>
              </View>
            </View>

            {/* Ödeme Yöntemi Seçin  */}

            <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
              <View style={styles.col1}>
                {typeof payment_method != "undefined" ?
                  <Picker onValueChange={(item) => setCustomerPaymentMethod(item)}
                    selectedValue={customerPaymentMethod} style={styles.picker}>
                    <Picker.Item label={typeof payment_method.methods != "undefined" ? "Ödeme Yöntemi Seçin" : "Ödeme Yöntemi Eklenmemiş"} value={"---"} />
                    {typeof payment_method != "undefined" ? payment_method.methods.map((item, index) =>
                      <Picker.Item key={index} label={item.title} value={item.short_title} />
                    ) : null}
                  </Picker>
                  : null}
              </View>
            </View>
            {/* "Ödeme Şekillerini Seçimi" */}
            {customerPaymentMethod == "KO" ?
              <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
                <View style={styles.col3}>
                  {typeof customer_credicard_list != "undefined" ?
                    <Picker onValueChange={(item) => setAttthedooroptions(item)} selectedValue={attthedooroptions} style={styles.picker}>
                      <Picker.Item label={typeof payment_method.methods[0].options != "undefined" ? "Bir Ödeme Şekli Seçin" : null} value={"---"} />
                      {typeof customer_credicard_list != "undefined" ? payment_method.methods[0].options.map(
                        (item, index) =>
                          <Picker.Item key={index} label={item} value={item} />
                      ) : null}
                    </Picker>
                    : null}
                </View>
              </View>
              : null}

            {customerPaymentMethod == "KK" ?
              <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
                <View style={styles.col3}>
                  {typeof customer_credicard_list != "undefined" ?
                    <Picker onValueChange={(item) => setCustomerCrediCard(item)} selectedValue={customerCrediCard} style={styles.picker}>
                      <Picker.Item label={typeof customer_credicard_list != "undefined" ? "Bir Kredi Kartı Ekleyin" : "KK Seçin"} value={"---"} />
                      {typeof customer_credicard_list != "undefined" ? customer_credicard_list.map(
                        (item, index) =>
                          <Picker.Item key={index} label={item.credicard_title} value={item.customer_credi_card_id} />
                      ) : null}
                    </Picker>
                    : null}
                </View>
                <View style={{ ...styles.col1, alignItems: "center" }}>
                  <TouchableOpacity style={{ ...styles.fillButton, backgroundColor: Colors.primary_color }}
                    onPress={openCardModal}>
                    <Ionicons style={{ ...styles.fillButtonText, color: Colors.text_color }} name={"ios-add-circle-outline"}></Ionicons>
                  </TouchableOpacity>
                </View>
              </View>
              : null}
            <Modal animationType="slide" visible={cardModal}><CardView colors={Colors} modalClose={cardModalCloseHandler} /></Modal>
            <View style={styles.jobCompleteSection}>
              <TouchableOpacity style={styles.jobComplete}
                onPress={completeJob}>
                <Text style={styles.jobCompleteText}>SİPARİŞİ TAMAMLA</Text>
              </TouchableOpacity>
            </View>
            {/* Siparişi Tamamla Modal  */}
            <Modal visible={jobCompleteModal}><JobCompleteView colors={Colors} colors={Colors} modalClose={jobCompleteModalCloseHandler} /></Modal>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )

}
BasketScreen.navigationOptions = (navigationData) => {
  const refresh = navigationData.navigation.getParam("refresh")
  const trash = navigationData.navigation.getParam("trash")
  return {
    headerTitle: "Sepetim",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Sepeti Temizle"
          iconName="ios-trash"
          onPress={trash}
        />
        <Item
          title="Yenile"
          iconName="ios-refresh"
          onPress={refresh}
        />
      </HeaderButtons>
    )
  }
}
const nstyles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  content: {
    width: "90%",
    alignItems: "center",
  },

})



export default BasketScreen