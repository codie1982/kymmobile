import React, { useState, useEffect, useReducer, useContext } from "react";
import {
  View, Text, Picker,PickerIOS, Platform,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity, Modal, ActivityIndicator, Alert
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import styles from "../assets/styles"
import { Ionicons } from "@expo/vector-icons"

import AdresView from "../component/adresView";
import CardView from "../component/cardView";
import PhoneView from "../component/phoneView";

import LoginComponent from "../component/loginComponent"
import RegisterComponent from "../component/registerComponent"
import * as customerAction from "../store/actions/customerAction"
import * as userAuth from "../store/actions/userAuth"

const UserContext = React.createContext()



function accountScreen(props) {
  
  const dispatch = useDispatch();
  const [registerstate, setRegisterstate] = useState("login")
  const [accountModal, setAccountModal] = useState(false)

  const application_detail = useSelector(state => state.info)
  const customer_information = useSelector(state => state.customer_information)
  const user_info = useSelector(state => state.user_info)
  const _user_info = useSelector(state => state.user_info.user_info)
  const checking = useSelector(state => state.user_info.ischecking)
  const [isLogin, setIsLogin] = useState(false)
  const [firstloading, setFirstloading] = useState(true)
  const application_settings = useSelector(state => state.settings)

  const [Colors, setColors] = useState({})

  const [customerAdres, setCustomerAdres] = useState()
  const [customerPhone, setCustomerPhone] = useState()
  const [customerCrediCard, setCustomerCrediCard] = useState()

  const [adresModal, setAdresModal] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false)

  const customer_adres_list = customer_information.customer_adress_list
  const customer_phone_list = customer_information.customer_phone_list
  const customer_credicard_list = customer_information.customer_credi_card_list


  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        const loginInfo = {
          user_email: action.user_email,
          user_password: action.user_password,
        }

        //console.log(action.type)
        dispatch(userAuth.userChecking(true))
        dispatch(userAuth.userLogin(loginInfo))
        dispatch(userAuth.userChecking(false))
        return state;
      case "register":
        const registerInfo = {
          user_name: action.user_name,
          user_lastname: action.user_lastname,
          user_email: action.user_email,
          user_password: action.user_password,
          user_repassword: action.user_repassword,
          privacy_policy: action.privacy_policy,
          advertisement: action.advertisement
        }
        dispatch(userAuth.userChecking(true))
        dispatch(userAuth.userRegister(registerInfo))
        dispatch(userAuth.userChecking(false))
        return state;
      default:
        return state
    }
  }
  let initialstate = {
    user_email: "",
    user_password: "",
    user_repassword: "",
    user_name: "",
    user_lastname: "",
    remind: "",
    privacy_policy: "",
    advertisement: "",
  };
  const [userInfo, userInfoDispatch] = useReducer(reducer, initialstate)

  const openAdresModal = () => setAdresModal(true);
  const openCardModal = () => setCardModal(true);
  const openPhoneModal = () => setPhoneModal(true);



  const adresRemoveHandler = async () => {
    if (typeof customerAdres != "undefined") {
      if (customerAdres != "---") {
        const customer_id = await AsyncStorage.getItem("userID");
        if (customer_id != null)
          await dispatch(customerAction.removeCustomerAdres(customerAdres, customer_id))
      } else {
        alert("Öncelikle Bir Adres Seçin")
      }
    } else {
      alert("Öncelikle Bir Adres Seçin")
    }
  }
  const phoneRemoveHandler = async () => {
    if (typeof customerPhone != "undefined") {
      if (customerPhone != "---") {
        const customer_id = await AsyncStorage.getItem("userID");
        if (customer_id != null)
          await dispatch(customerAction.removeCustomerPhoneNumber(customerPhone, customer_id))

      } else {
        alert("Öncelikle Bir Telefon Numarası Seçin")
      }
    } else {
      alert("Öncelikle Bir Telefon Numarası Seçin")
    }
  }
  const credicardRemoveHandler = async () => {
    if (typeof customerCrediCard != "undefined") {
      if (customerCrediCard != "---") {
        const customer_id = await AsyncStorage.getItem("userID");
        if (customer_id != null)
          await dispatch(customerAction.removeCustomerCrediCard(customerCrediCard, customer_id))
      } else {
        alert("Öncelikle Bir Kredi Kartı Seçin")
      }
    } else {
      alert("Öncelikle Bir Kredi Kartı Seçin")
    }
  }
  const adresModalCloseHandler = () => {
    setAdresModal(false)
  }
  const cardModalCloseHandler = () => {
    setCardModal(false)
  }
  const phoneModalCloseHandler = () => {
    setPhoneModal(false)
  }


  useEffect(() => {
    const checkCustomer = async () => {
      await setFirstloading(true);
      const _userID = await AsyncStorage.getItem('userID');
      if (_userID == null) {
        setIsLogin(false)
      } else {
        //Local Stroge'de Kullanıcı idsi belirtilmiş ise o kullanıcıya ait bilgileri almamız gerekmektedir.
        await dispatch(customerAction.getCustomerInfo(_userID))
        setIsLogin(true)
      }
      await setFirstloading(false);
    };
    checkCustomer();
    setColors({ primary_color: application_detail.info.primary_color, text_color: application_detail.info.text_color })
  }, [])

  useEffect(() => { }, [customer_adres_list])

  const logoutHandler = () => {
    Alert.alert(
      'Çıkış Yap',
      'Sistemden Çıkış yapmak istediğinizden eminmisiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Evet', onPress: async () => {
            await dispatch(userAuth.userChecking(true))
            await dispatch(userAuth.userLogout())
            await dispatch(userAuth.userChecking(false))
          }
        },
      ],
      { cancelable: false },
    );

  }



  useEffect(() => {
    const checkCustomer = async () => {
      await setFirstloading(true);
      const _userID = await AsyncStorage.getItem('userID');
      if (_userID == null) {
        setIsLogin(false)
      } else {
        //Local Stroge'de Kullanıcı idsi belirtilmiş ise o kullanıcıya ait bilgileri almamız gerekmektedir.
        await dispatch(customerAction.getCustomerInfo(_userID))
        setIsLogin(true)
      }
      await setFirstloading(false);
    };
    checkCustomer();

  }, [_user_info])

  if (firstloading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
  }

  if (checking) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
  }


  if (isLogin) {
    return (
      <View style={nstyles.container}>
        <View style={{ ...nstyles.content, }}>
          <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
            <View style={styles.col3}><Text style={{ ...styles.jobTitle, color: "#111" }} >Hesap Bilgileriniz</Text></View>
            <View style={{ ...styles.col1 }}>
              <TouchableOpacity onPress={logoutHandler} style={{ backgroundColor: Colors.primary_color, padding: 5, borderRadius: 50 / 2, }}>
                <Text style={{ color: Colors.text_color, textAlign: "center" }} >Çıkış Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%", height: "60%" }}>
            <View style={styles.row}>
              <View style={styles.col1}><Text>Adınız Soyadınız</Text></View>
              <View style={styles.col1}><Text>:</Text></View>
              <View style={styles.col3}><Text>{customer_information.customer_general.customer_name} {customer_information.customer_general.customer_lastname}</Text></View>
            </View>
            <View style={styles.row}>
              <View style={styles.col1}><Text>Email adresiniz</Text></View>
              <View style={styles.col1}><Text>:</Text></View>
              <View style={styles.col3}><Text>{customer_information.customer_mail_list[0].customer_mail}</Text></View>
            </View>
            <View style={{ height: "60%", width: "100%" }}>
              {/* Yeni Adres Ekle Modal  */}
              <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
                <Modal animationType="slide" visible={adresModal}>
                  <AdresView colors={Colors} modalClose={adresModalCloseHandler} />
                </Modal>
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
                {/*ADD ADRES BUTTON*/}
                <View style={{ ...styles.col1, alignItems: "center" }}>
                  <TouchableOpacity style={{ ...styles.fillButton, backgroundColor: Colors.primary_color }} onPress={openAdresModal} >
                    <Ionicons style={{ ...styles.fillButtonText, color: Colors.text_color }} name={"ios-add-circle-outline"}></Ionicons>
                    <View ></View>
                  </TouchableOpacity>
                </View>
                {/*REMOVE ADRES BUTTON*/}
                <View style={{ ...styles.col1, alignItems: "center" }}>
                  <TouchableOpacity style={{ ...styles.fillButton, backgroundColor: "red" }} onPress={adresRemoveHandler} >
                    <Ionicons style={{ ...styles.fillButtonText, borderColor: "red", color: "#ffffff" }} name={"ios-remove-circle-outline"}></Ionicons>
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
                      <Picker.Item label={typeof customer_phone_list != "undefined" ? "Bir Telefon Numarası Seçin" : "Telefon Numarsı Ekleyin"} value={"---"} />
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
                {/*REMOVE PHONE BUTTON*/}
                <View style={{ ...styles.col1, alignItems: "center" }}>
                  <TouchableOpacity style={{ ...styles.fillButton, borderColor: "red", backgroundColor: "red" }} onPress={phoneRemoveHandler} >
                    <Ionicons style={{ ...styles.fillButtonText, color: "#ffffff" }} name={"ios-remove-circle-outline"}></Ionicons>
                    <View ></View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Yeni Kredi Kartı Ekle Modal  */}
              <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
                <Modal animationType="slide" visible={cardModal}><CardView colors={Colors} modalClose={cardModalCloseHandler} /></Modal>
                <View style={styles.col3}>
                  {typeof customer_credicard_list != "undefined" ?
                    <Picker onValueChange={(item) => setCustomerCrediCard(item)} selectedValue={customerCrediCard} style={styles.picker}>
                      <Picker.Item label={typeof customer_adres_list != "undefined" ? "Bir Kredi Kartı Ekleyin" : "KK Seçin"} value={"---"} />
                      {typeof customer_credicard_list != "undefined" ? customer_credicard_list.map(
                        (item, index) =>
                          <Picker.Item key={index} label={item.credicard_title} value={item.customer_credi_card_id} />
                      ) : null}
                    </Picker>
                    : null}
                </View>
                {/*ADD CREDICARD BUTTON*/}
                <View style={{ ...styles.col1, alignItems: "center" }}>
                  <TouchableOpacity style={{ ...styles.fillButton, backgroundColor: Colors.primary_color }}
                    onPress={openCardModal}>
                    <Ionicons style={{ ...styles.fillButtonText, color: Colors.text_color }} name={"ios-add-circle-outline"}></Ionicons>
                  </TouchableOpacity>
                </View>
                {/*REMOVE CREDICARD BUTTON*/}
                <View style={{ ...styles.col1, alignItems: "center" }}>
                  <TouchableOpacity style={{ ...styles.fillButton, borderColor: "red", backgroundColor: "red" }} onPress={credicardRemoveHandler} >
                    <Ionicons style={{ ...styles.fillButtonText, color: "#ffffff" }} name={"ios-remove-circle-outline"}></Ionicons>
                    <View ></View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <UserContext.Provider value={{ userState: userInfo, userDispatch: userInfoDispatch }}>
        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#fff" }}>
          <View style={{ width: "100%" }}>
            {registerstate == "login" ?
              <TouchableOpacity onPress={() => { setRegisterstate("register") }}
                style={{ justifyContent: "flex-start", width: "100%", backgroundColor: Colors.primary_color }}
              >
                <Text style={{ color: Colors.text_color, textAlign: "center", lineHeight: 40 }}>Kayıt Ol</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => setRegisterstate("login")}
                style={{ justifyContent: "flex-start", width: "100%", backgroundColor: Colors.primary_color }} >
                <Text style={{ color: Colors.text_color, textAlign: "center", lineHeight: 40 }}>Giriş Yap</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#fff" }}>
            {registerstate == "login"
              ?
              <LoginComponent
                message={user_info.message}
                state={user_info.error_type != "" ? "danger" : "success"}
                colors={Colors} context={UserContext}
              />
              :
              <RegisterComponent
                message={user_info.message}
                state={user_info.error_type != "" ? "danger" : "success"} colors={Colors} context={UserContext} />
            }
          </View>
        </View>
      </UserContext.Provider>
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
export default accountScreen

