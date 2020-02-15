import React, { useState, useEffect, useReducer, useContext } from "react";
import {
  View, Text, TouchableOpacity, AsyncStorage, Modal, Button, ActivityIndicator
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import LoginComponent from "../loginComponent"
import RegisterComponent from "../registerComponent"

import * as userAuth from "../../store/actions/userAuth"

const UserContext = React.createContext()



function Productdetailbottom(props) {
  const [registerstate, setRegisterstate] = useState("login")
  const [accountModal, setAccountModal] = useState(false)
  const dispatch = useDispatch()
  const user_information = useSelector(state => state.user_info)
  const adding = useSelector(state => state.jobInfo.adding)

  useEffect(() => {
    setAccountModal(false)
  }, [user_information])

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        const loginInfo = {
          user_email: action.user_email,
          user_password: action.user_password,
        }
        dispatch(userAuth.userLogin(loginInfo))
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
        dispatch(userAuth.userRegister(registerInfo))
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

  const addCart = async () => {
    const _userID = await AsyncStorage.getItem('userID');
    if (_userID != null) {
      props.addToCard();
    } else {
      setAccountModal(true)
    }


  }

  return (
    <UserContext.Provider value={{ userState: userInfo, userDispatch: userInfoDispatch }}>
      <View>
        <View style={{ marginTop: 22 }}>
          <Modal visible={accountModal}>
            {registerstate == "login"
              ?
              <LoginComponent
                message={user_information.message}
                state={user_information.error_type != "" ? "danger" : "success"}
                colors={props.colors} context={UserContext}
              />
              :
              <RegisterComponent
                message={user_information.message}
                state={user_information.error_type != "" ? "danger" : "success"} colors={props.colors} context={UserContext} />


            }
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
              <Button onPress={() => setAccountModal(false)} title={"Kapat"} />
              {
                registerstate == "login" ?
                  <Button onPress={() => setRegisterstate("register")} title={"Kayıt Ekranı"} />
                  :
                  <Button onPress={() => setRegisterstate("login")} title={"Giriş Ekranı"} />
              }
            </View>
          </Modal>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingHorizontal: 20, backgroundColor: "#ffffff", }} >
          {adding ?
            <ActivityIndicator />
            :
            <TouchableOpacity onPress={addCart}
              style={{ marginTop: 10, width: "50%", margin: "auto", height: 50, backgroundColor: props.colors.primary_color, marginBottom: 10, borderRadius: 20 }}>
              <Text style={{ textAlign: "center", lineHeight: 50, fontSize: 22, fontFamily: "mclaren", fontWeight: "700", color: "#ffffff", }}>{props.button_title}</Text>
            </TouchableOpacity>
          }
          <Text style={{ textAlign: "center", lineHeight: 50, fontSize: 18, fontFamily: "mclaren", fontWeight: "500", color: props.colors.text_color, }}>Toplam : {props.total} {props.unit}</Text>
        </View>
      </View>
    </UserContext.Provider>
  )
}

export default Productdetailbottom;