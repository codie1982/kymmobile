import React, { useState, useEffect, useReducer } from "react";
import {
  View, Text,
  StyleSheet, ScrollView,
  FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";

import Mainslider from "../component/mainslider"
import ProductItem from "../component/productItem"
import Pagination from "../component/pagination"

import styles from "../assets/styles";
import { useSelector, useDispatch } from "react-redux";

import * as ProductAction from "../store/actions/productAction"
import { UpperString } from "../function/basic";

const Context = React.createContext()

function ProductlistScreen(props) {
  const selected_category_id = props.navigation.getParam("selected_category_id")
  //Aplikasyon Detay Bilgileri
  const application_detail = useSelector(state => state.info)
  const [Colors, setColors] = useState({})
  useEffect(() => {
    setColors({ primary_color: application_detail.info.primary_color, text_color: application_detail.info.text_color })
  }, [application_detail])
  const products = useSelector(state => state.products)

  useEffect(() => {
    // console.log(products)
  }, [products])

  const dispatch = useDispatch()

  const reducer = (state, action) => {
    switch (action.type) {
      case "getPage":
        const loadProductList = async (category_id) => {
          await dispatch(ProductAction.isLoading(true))
          await dispatch(ProductAction.getProductList(category_id, action.pageNumber))
          await dispatch(ProductAction.isLoading(false))
        }
        loadProductList(selected_category_id);
        return state;
      default:
        return state
    }
  }
  let initialstate = {
    pageNumber: 1,
  };
  const [categoryInfo, categoryInfoDispatch] = useReducer(reducer, initialstate)

  useEffect(() => {

    const loadProductList = async (category_id) => {
      await dispatch(ProductAction.isLoading(true))

      await dispatch(ProductAction.getProductList(category_id, 1))

      await dispatch(ProductAction.isLoading(false))
    }
    loadProductList(selected_category_id);
  }, [dispatch])

  const customer_favorites_list = useSelector(state => state.customer_information.customer_favorite_list)

  const productItem = itemData => {
    var found = customer_favorites_list.find(function (element) {
      return element.id == selected_category_id;
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

  return (
    <Context.Provider value={{ State: categoryInfo, Dispatch: categoryInfoDispatch }}>
      <View style={{ ...styles.container, width: "100%", justifyContent: "center" }} >
        {application_detail.info.main_slider == 1 ? <Mainslider navigation={props.navigation} /> : null}
        <View style={nstyles.product_list_content} >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "300", paddingHorizontal: 10, lineHeight: 22 }}>Ürün Listesinden istediğiniz ürünlere göre "Sipariş Ver" butonu ile verebilirsiniz</Text>
          </View>
          <ScrollView>
            {products.isloading
              ?
              <View style={{ justifyContent: "center" }}>
                <ActivityIndicator />
              </View>
              :
              products.product_list.length != 0 ?
                //Kategori Ürün Listesi
                <View>
                  <FlatList
                    data={products.product_list}
                    keyExtractor={(item, index) => item.id}
                    renderItem={productItem}
                    style={{ width: "100%" }}
                  >
                  </FlatList>

                </View>
                :
                //Kategoride Ürün Yoksa - Benzer ürünleri listeleyip bu ürünlerin tadına bakmanız gerekli diye uyarı çıkarmamız lazım
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                  <View>
                    <Text >{products.message}</Text>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <TouchableOpacity onPress={() => {
                      props.navigation.popToTop()
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
            }
          </ScrollView>
          {products.open_pagination ?
            <Pagination Context={Context} activePage={products.active_page} lastPage={products.last_page} Colors={Colors} />
            : null}
        </View>
      </View>
    </Context.Provider>

  )
}
ProductlistScreen.navigationOptions = (navigationData) => {
  const selected_category = navigationData.navigation.getParam("selected_category")
  return {
    headerTitle: UpperString(selected_category.name)
    //headerTitle: <Header/>,
  }
}

const nstyles = StyleSheet.create({
  product_list_content: {
    flex: 1,
    marginTop: 5,
    //height: "60%",
    justifyContent: "center",
    width: "100%"
  },

})

export default ProductlistScreen