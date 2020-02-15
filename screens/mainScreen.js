import React, { useState, useEffect } from "react";
import {
  View, ActivityIndicator,
  ScrollView, AsyncStorage
} from "react-native";

import styles from "../assets/styles";

import { useSelector, useDispatch } from "react-redux";


import Mainslider from "../component/mainslider"
import Subcompanylist from "../component/subcompanylist"
import Categorylist from "../component/categorylist"
import JobList from "../component/jobList"

import UserInfo from "../component/userInfo"

import * as CategoryAction from "../store/actions/categoryAction"
import * as MainInfoAction from "../store/actions/MainInfoAction"
import * as MainSliderAction from "../store/actions/MainSliderAction"
import * as ProductAction from "../store/actions/productAction"

import * as UserAuth from "../store/actions/userAuth"
import * as customerAction from "../store/actions/customerAction"
import * as JobAction from "../store/actions/jobAction"
import * as SettingsAction from "../store/actions/settingsActions"
import * as AdresActions from "../store/actions/adresActions"


function MainScreen(props) {
  const [userID, setUserID] = useState()
  const [isLogin, setIsLogin] = useState(false)
  const [isThereJob, setIsThereJob] = useState(false)
  const [isloading, setisloading] = useState(true)
  const [Colors, setColors] = useState({})
  const job_detail = useSelector(state => state.jobInfo)
  const application_detail = useSelector(state => state.info)
  const application_settings = useSelector(state => state.settings)
  const favorite_product_list = useSelector(state => state.products.favorite_product_list)
  const customer_favorites_list = useSelector(state => state.customer_information.customer_favorite_list)
  const customer_info = useSelector(state => state.user_info)


  const dispatch = useDispatch()
  useEffect(() => {
    //Main Data
    const loadFirstData = async () => {
      setisloading(true)
      await dispatch(MainInfoAction.setLoading(true))
      //Genel Ayarları
      await dispatch(MainInfoAction.getApplicationInfo())
      //Aplikasyon Ayarları
      await dispatch(SettingsAction.getApplicationSettings())
      //Kategori Listesi Data
      await dispatch(CategoryAction.getCategoryList())
      //Genel Slider Data
      await dispatch(MainSliderAction.getMainSliderInfo())
      //Öne Çıkanlar Data
      await dispatch(ProductAction.getFavoriteProduct())
      //İller Listesi
      await dispatch(AdresActions.getProvince())
      //Önceki Siparişler

      //Favoriler
      const _userID = await AsyncStorage.getItem('userID');
      if (_userID == null) {
        setUserID(0)
        setIsLogin(false)
      } else {
        //Local Stroge'de Kullanıcı idsi belirtilmiş ise o kullanıcıya ait bilgileri almamız gerekmektedir.
        await dispatch(customerAction.getCustomerInfo(_userID))
        setUserID(_userID)
        setIsLogin(true)
      }
      //Kayıtlı İşler
      const _jobID = await AsyncStorage.getItem('jobID');
      if (_jobID == null && _userID == null) {
        setIsThereJob(false)
      } else {
        await dispatch(JobAction.getJobDetails(_jobID, _userID))
        setIsThereJob(true)
      }

      await dispatch(MainInfoAction.setLoading(false))

      setisloading(false)
    }
    loadFirstData()

    //console.log("application_settings")
    //console.log(application_settings)
  }, [dispatch])

  useEffect(() => {
    const loadFirstData = async () => {
      const _userID = await AsyncStorage.getItem('userID');
      if (_userID == null) {
        setUserID(0)
        setIsLogin(false)
      } else {
        //Local Stroge'de Kullanıcı idsi belirtilmiş ise o kullanıcıya ait bilgileri almamız gerekmektedir.
        await dispatch(customerAction.getCustomerInfo(_userID))
        setUserID(_userID)
        setIsLogin(true)
      }
      //Kayıtlı İşler
      const _jobID = await AsyncStorage.getItem('jobID');
      if (_jobID == null && _userID == null) {
        setIsThereJob(false)
      } else {
        await dispatch(JobAction.getJobDetails(_jobID, _userID))
        setIsThereJob(true)
      }
    }
    loadFirstData()
  }, [customer_info])



  useEffect(() => {
    setColors({ primary_color: application_detail.info.primary_color, text_color: application_detail.info.text_color })
  }, [application_detail])



  if (isloading) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  } else {
    return (
      <View style={styles.sliderContainer}>
        {application_detail.info.main_slider == 1 ? <Mainslider navigation={props.navigation} /> : null}
        {isLogin ? <UserInfo /> : null}
        <ScrollView>
          <View style={styles.container}>
            {application_detail.info.sub_company == true ? <Subcompanylist colors={Colors} /> : null}
            <Categorylist colors={Colors} title={"Kategori Seçin"} negative_answer={"Kategori Bulunmamakta"} navigation={props.navigation} />

            <JobList navigation={props.navigation}
              colors={Colors} data={favorite_product_list} title={"Öne Çıkanlar"}
              negatif_answer={"Sisteme Öne Çıkan Ürün Eklenmemiştir"} />

            <JobList navigation={props.navigation} colors={Colors} data={customer_favorites_list}
              title={"Favorileriniz"} negatif_answer={"Favori Ürün Seçiminiz Bulunmamaktadır"} />
          </View>
        </ScrollView>
      </View>
    )
  }
}


export default MainScreen