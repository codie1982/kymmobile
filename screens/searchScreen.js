import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, Picker,
  ScrollView, StyleSheet,
  TouchableOpacity, Modal, Alert,
  TextInput, AsyncStorage, FlatList, ActivityIndicator
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../component/HeaderButton';

import styles from "../assets/styles"
import { Ionicons } from "@expo/vector-icons"
import ProductItem from "../component/productItem"

import * as productAction from "../store/actions/productAction";

function SearchScreen(props) {
  const application_detail = useSelector(state => state.info)
  const customer_information = useSelector(state => state.customer_information)
  const application_settings = useSelector(state => state.settings)
  
  const search_product_list = useSelector(state => state.products.search_product_list)
  const searching = useSelector(state => state.products.searching)
  const no_search = useSelector(state => state.products.no_search)
  const search_message = useSelector(state => state.products.search_message)
  const customer_favorites_list = useSelector(state => state.customer_information.customer_favorite_list)
  const [Colors, setColors] = useState({})

  const [searchText, setSearchText] = useState("")


  const dispatch = useDispatch();

  useEffect(() => {
  }, [search_product_list])

  useEffect(() => {
    setColors({ primary_color: application_detail.info.primary_color, text_color: application_detail.info.text_color })
  }, [])

  const searchHandler = async () => {
    if (searchText == "") {
      alert("Bir Arama Terimi Yazın.")
    } else {
      if (searchText.length < 3) {
        alert("En Az 3 ve daha yüksek bir arama terimi girmniz gerekmektedir.")
      } else {
        await dispatch(productAction.searching(true))
        await dispatch(productAction.searchProduct(searchText))
        await dispatch(productAction.searching(false))
      }
    }
  }


  const productItem = itemData => {
    var found = customer_favorites_list.find(function (element) {
      return element.id == itemData.item.id;
    });

    return (<ProductItem
      colors={Colors}
      title={itemData.item.product_name}
      subtitle={itemData.item.product_sub_name}
      price={itemData.item.product_sales_price}
      unit={itemData.item.product_unit}
      onSelected={() => {
        props.navigation.navigate({
          routeName: "productDetail", params: {
            product_info: itemData.item,
            customer_favorite: typeof found != "undefined" ? 1 : 0
          }
        })
      }}
      buttonText={"Sipariş Ver"}
    />)
  }

  return (<View style={nstyles.container}>
    <View style={{ ...nstyles.content }}>
      <View style={{ ...styles.section, borderColor: Colors.primary_color, }}>
        <View style={styles.col1}><Text style={{ ...styles.jobTitle, color: "#111" }} >Arama Yapın</Text></View>
      </View>
      <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
        <View style={{ ...styles.section, borderColor: Colors.primary_color }}>
          <View style={styles.col3}>
            <TextInput
              style={{ minHeight: 40, borderColor: Colors.text_color, borderWidth: 0.5, padding: 10 }}
              placeholder={"Arama Terimi Girin"}
              onChangeText={(text) => { setSearchText(text) }}
              value={searchText}
            />
          </View>
          <View style={{ ...styles.col1, alignItems: "center" }}>
            <TouchableOpacity style={{ ...styles.fillButton, backgroundColor: Colors.primary_color }} onPress={searchHandler} >
              <Ionicons style={{ ...styles.fillButtonText, color: Colors.text_color }} name={"ios-search"}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      <View style={{ width: "100%", height: "80%", justifyContent: "center", alignItems: "center" }}>
        <ScrollView style={{ width: "100%" }}>
          {searching
            ?
            <View style={{ justifyContent: "center" }}>
              <ActivityIndicator style={{ flex: 1, alignItems: "center", justifyContent: "center" }} />
            </View>
            :
            search_product_list.length != 0 ?
              //Arama Ürün Listesi
              <View>
                <FlatList
                  data={search_product_list}
                  keyExtractor={(item, index) => item.id}
                  renderItem={productItem}
                  style={{ width: "100%" }}
                >
                </FlatList>
              </View>
              :
              //aramalardaki ürünlerin listesi 
              <View>
                {no_search ?
                  <View style={styles.row}>
                    <View style={styles.col1}>
                      <Text style={{ fontSize: 16, color: "red", fontWeight: "500",textAlign:"center" }}>{search_message}</Text>
                    </View>

                  </View> : null}
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <View >
                    <TouchableOpacity onPress={() => {
                      props.navigation.navigate("job")
                    }}
                      style={{
                        padding: 10, marginTop: 10, width: "50%", margin: "auto", backgroundColor: Colors.primary_color,
                        marginBottom: 10, borderRadius: 20
                      }}
                    ><Text
                      style={{
                        textAlign: "center", fontSize: 22, fontFamily: "mclaren", fontWeight: "700",
                        color: Colors.text_color,
                      }}
                    >Ana Sayfaya Dön</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          }
        </ScrollView>
      </View>
    </View>
  </View>)

}

export default SearchScreen

const nstyles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  content: {
    width: "90%",
    alignItems: "center",
  },

})