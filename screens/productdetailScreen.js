import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet, ScrollView,
  AsyncStorage, ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../component/HeaderButton';

import RadioOptions from "../component/product_detail/radioOptions"
import CheckOptions from "../component/product_detail/checkOptions"
import Productdetailheader from "../component/product_detail/productdetailheader"
import Productdetailbottom from "../component/product_detail/productdetailbottom"
import Productcounter from "../component/product_detail/productcounter"

import styles from "../assets/styles"


import * as ProductAction from "../store/actions/productAction"
import * as customerAction from "../store/actions/customerAction"
import * as jobAction from "../store/actions/jobAction"
import { calculateOption } from "../function/basic";

const PriceContext = React.createContext()

let initial_price_info = {
  amount: 1,
  oneSelection: [],
  multipleSelection: []
};
let selected_multiple_options = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "decrement":
      return Object.assign({}, state, { amount: state.amount - 1 });
    case "increment":
      return Object.assign({}, state, { amount: state.amount + 1 });
    case "oneSelection":
      return Object.assign({}, state, { oneSelection: action.selected_option });
    case "clear":
      //console.log("Clear State")
      //console.log(state)
      return Object.assign({}, state, { multipleSelection: [], oneSelection: [] });
    case "multipleSelection":
      let selected_group_id
      let listed_group_id
      if (action.selected_options.length != 0)
        for (let [key, value] of Object.entries(action.selected_options[0])) {
          selected_group_id = key
        }
      if (selected_multiple_options.length != 0)
        for (let i = 0; i < selected_multiple_options.length; i++) {
          for (let n = 0; n < selected_multiple_options.length; n++) {
            if (typeof selected_multiple_options[i][n] !== "undefined") {
              for (let [key, value] of Object.entries(selected_multiple_options[i][n])) {
                listed_group_id = key
                if (typeof listed_group_id !== "undefined") {
                  if (selected_group_id == listed_group_id) {
                    selected_multiple_options.splice(i, 1)
                  }
                }
              }
            }
          }
        }
      if (action.selected_options.length != 0)
        selected_multiple_options.push(action.selected_options)

      return Object.assign({}, state, { multipleSelection: selected_multiple_options });
    default:
      return state
  }
}

function ProductdetailScreen(props) {

  const [price_info, priceInfoDispatch] = useReducer(reducer, initial_price_info)
  const product_info = useSelector(state => state.products.product_detail)
  const isFavoriteloading = useSelector(state => state.customer_information.isFavoriteloading)
  const application_detail = useSelector(state => state.info)

  const cardLoading = useSelector(state => state.jobInfo.addCardLoading)

  const status = useSelector(state => state.jobInfo.status)

  const jobID = useSelector(state => state.jobInfo.jobID)



  const [jobTotal, setJobTotal] = useState(0)
  const product_navigation_info = props.navigation.getParam('product_info');
  const customer_id = props.navigation.getParam('customer_id');
  const product_selected_id = product_navigation_info.id

  const isFavorite = useSelector(state => state.customer_information.customer_favorite_list.some(item => item.id === product_selected_id))
  useEffect(() => {
    props.navigation.setParams({ isfav: isFavorite })
  }, [isFavorite])

  const [isloading, setisloading] = useState(true)
  const [isAddCard, setisAddCard] = useState(false)
  const [Colors, setColors] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {


  }, [product_info])

  useEffect(() => {

    priceInfoDispatch({ type: "clear" })
    setColors({ primary_color: application_detail.info.primary_color, text_color: application_detail.info.text_color })
  }, [])

  useEffect(() => {
    setisloading(true)
    const loadProduct = async (product_id) => {
      await dispatch(ProductAction.getProductDetail(product_id))
      setisloading(false)
    }
    loadProduct(product_selected_id);
  }, [dispatch])

  useEffect(() => {
    let totalPrice;
    const product_sales_price = product_info.product_sales_price
    totalPrice = product_sales_price;

    if (typeof price_info != "undefined")
      if (price_info.oneSelection.length != 0) {
        for (let i = 0; i < price_info.oneSelection.length; i++) {
          for (let [key, obj] of Object.entries(price_info.oneSelection[i])) {
            let direction = obj.direction
            let type = obj.type
            let value = obj.value
            totalPrice = calculateOption(totalPrice, direction, type, value)
          }
        }
      }
    if (price_info.multipleSelection.length != 0) {
      for (let i = 0; i < price_info.multipleSelection.length; i++) {
        for (let n = 0; n < price_info.multipleSelection[i].length; n++) {
          for (let [key, obj] of Object.entries(price_info.multipleSelection[i][n])) {
            let direction = obj.direction
            let type = obj.type
            let value = obj.value
            totalPrice = calculateOption(totalPrice, direction, type, value)
          }
        }
      }
    }
    if (typeof totalPrice == "undefined") {
      totalPrice = product_info.product_sales_price;
    }

    setJobTotal(totalPrice * price_info.amount)
  }, [price_info])

  const handlerAddtoCart = async () => {
    const _userID = await AsyncStorage.getItem('userID');
    if (_userID != null) {
      await dispatch(jobAction.addToCardloading(true))
      const noptions = [];
      for (let i = 0; i < price_info.oneSelection.length; i++) {
        for (let [key, value] of Object.entries(price_info.oneSelection[i])) {
          value.group_id = key
          noptions.push(value)
        }
      }
      for (let i = 0; i < price_info.multipleSelection.length; i++) {
        for (let n = 0; n < price_info.multipleSelection[i].length; n++) {
          for (let [key, value] of Object.entries(price_info.multipleSelection[i][n])) {
            value.group_id = key
            noptions.push(value)
          }
        }
      }

      const jobData = { amount: price_info.amount, customer_id: _userID, product_id: product_selected_id, options: noptions }
      await dispatch(jobAction.adding(true))
      await dispatch(jobAction.addToCard(jobData))
      await dispatch(jobAction.adding(false))
    } else {
      alert("Öncelikle Giriş Yapmanız gerekmektedir")
    }


  }
  useEffect(() => {
    if (status) {
      props.navigation.navigate({
        routeName: "basket",
        params: {
          isactivator: true
        }
      })
    }
    dispatch(jobAction.addToCardloading(false))
  }, [status])

  const addFavoritesHandler = useCallback(() => {
    const addFavorites = async (product_id) => {
      const _userID = await AsyncStorage.getItem('userID');

      if (_userID == null) {
        alert("Öncelikle Giriş Yapmanız Gerekmektedir.")
      } else {
        await dispatch(customerAction.addProductCustomerFavorites(product_id, _userID))
      }
    }
    addFavorites(product_selected_id);
  }, [dispatch, product_selected_id])

  const removeFavoritesHandler = useCallback(() => {
    const remFavorites = async (product_id) => {
      const _userID = await AsyncStorage.getItem('userID');
      if (_userID == null) {
        alert("Öncelikle Giriş Yapmanız Gerekmektedir.")
      } else {
        await dispatch(customerAction.removeProductCustomerFavorites(product_id, _userID))
      }
    }
    remFavorites(product_selected_id);
  }, [dispatch, product_selected_id])

  useEffect(() => {
    props.navigation.setParams({ addFavorites: addFavoritesHandler, removeFavorites: removeFavoritesHandler })
  }, [addFavoritesHandler, removeFavoritesHandler])


  if (isloading) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  }

  if (isFavoriteloading) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  }

  return (
    <PriceContext.Provider value={{ priceState: price_info, priceDispatch: priceInfoDispatch }}>
      <View style={{ ...styles.container, width: "100%" }} >
        <ScrollView>
          <View style={{ ...nstyles.content, width: "100%" }}>
            <Productdetailheader
              colors={Colors}
              title={product_info.product_name} description={product_info.product_sub_name} />
            <Productcounter
              decrement={() => priceInfoDispatch({ type: "decrement", price_info: product_info })}
              increment={() => priceInfoDispatch({ type: "increment", price_info: product_info })}
              amount={price_info.amount}
              colors={Colors}
              product_sales_price={product_info.product_sales_price}
              product_price_unit={product_info.product_unit}
            />
            {product_info.product_price_group != null ?
              product_info.product_price_group.map((item, index) =>
                item.type == "radio" ?
                  <RadioOptions
                    group_id={item.group_id}
                    context={PriceContext}
                    colors={Colors}
                    key={index}
                    title={item.title}
                    options={item.opitons}
                    price_unit={product_info.product_unit}
                  />
                  : <CheckOptions
                    group_id={item.group_id}
                    context={PriceContext}
                    colors={Colors}
                    key={index}
                    id={item.id}
                    title={item.title}
                    options={item.opitons}
                    price_unit={product_info.product_unit}
                  />

              )
              :
              null}
          </View>
        </ScrollView>
        <Productdetailbottom
          colors={Colors}
          loading={cardLoading}
          button_title={"Sepete Ekle"}
          total={isNaN(jobTotal) ? 0.00 : jobTotal}
          unit={product_info.product_unit}
          context={PriceContext}
          addToCard={handlerAddtoCart}
        />
      </View>
    </PriceContext.Provider>
  )

}

ProductdetailScreen.navigationOptions = navigationData => {
  const product_info = navigationData.navigation.getParam('product_info');
  const addFavorites = navigationData.navigation.getParam("addFavorites");
  const removeFavorites = navigationData.navigation.getParam("removeFavorites");
  const customer_favorite = navigationData.navigation.getParam('customer_favorite');
  const isfavorite = navigationData.navigation.getParam("isfav")
  return {
    headerTitle: product_info.product_name,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isfavorite ? "ios-star" : "ios-star-outline"}
          onPress={isfavorite ? removeFavorites : addFavorites}
        />
        <Item
          title="sepetim"
          iconName="ios-cart"
          onPress={() => {
            navigationData.navigation.navigate({ routeName: "card" })
          }}
        />
      </HeaderButtons>
    )
  };
}

const nstyles = StyleSheet.create({
  content: {
    width: "100%",
    paddingHorizontal: 20,
  }
})
export default ProductdetailScreen
