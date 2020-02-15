import React from "react";

import mainScreen from "../screens/mainScreen"
import Test from "../screens/test"

import { useSelector } from "react-redux";


import Header from "../component/header"

import ProductdetailScreen from "../screens/productdetailScreen"
import ProductlistScreen from "../screens/productlistScreen"
import BasketScreen from "../screens/basketScreen"
import SearchScreen from "../screens/searchScreen"
import LoginScreen from "../screens/loginScreen"
import RegisterScreen from "../screens/registerScreen"
import ForgotpasswordScreen from "../screens/forgotpasswordScreen"
import AccountScreen from "../screens/accountScreen"

import { Ionicons } from "@expo/vector-icons"

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Stack Navigator


const defaultStackNavOptions = {
  headerTitle: <Header/>,
}
/**
 * Test: {
    screen: Test
  },
 */
const appStackNavigator = createStackNavigator({
  
    mainPage: {
    screen: mainScreen
  },
  productList: {
    screen: ProductlistScreen
  },
  productDetail: {
    screen: ProductdetailScreen
  },
  basket: {
    screen: BasketScreen
  },
  search: {
    screen: SearchScreen
  },
  login: {
    screen: LoginScreen
  },
  register: {
    screen: RegisterScreen
  },
  forgotpassword: {
    screen: ForgotpasswordScreen
  },
},
  {
    defaultNavigationOptions: defaultStackNavOptions
  })
//Tab Navigator

const searchNavigator = createStackNavigator(
  {
    search: SearchScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const basketNavigator = createStackNavigator(
  {
    basket: BasketScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const accountNavigator = createStackNavigator(
  {
    account: AccountScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const appBottomTabNavigator = createBottomTabNavigator({
  job: {
    screen: appStackNavigator,
    navigationOptions: {
      tabBarLabel: "Sipariş",
      tabBarIcon: (tabInfo) => {

        return (<Ionicons name={'ios-restaurant'} size={25} color={tabInfo.tintColor} />)
      }
    }
  },
  search: {
    screen: searchNavigator,
    navigationOptions: {
      tabBarLabel: "Ara",
      tabBarIcon: (tabInfo) => {
        return (<Ionicons name={'ios-search'} size={25} color={tabInfo.tintColor} />)
      }
    }
  },
  card: {
    screen: basketNavigator,
    navigationOptions: {
      tabBarLabel: "Sepet",
      tabBarIcon: (tabInfo) => {
        return (<Ionicons name={'ios-cart'} size={25} color={tabInfo.tintColor} />)
      }
    }
  },
  user: {
    screen: accountNavigator,
    navigationOptions: {
      tabBarLabel: "Hesabım",
      tabBarIcon: (tabInfo) => {
        return (<Ionicons name={'ios-person'} size={25} color={tabInfo.tintColor} />)
      }
    }
  }
})

export default createAppContainer(appBottomTabNavigator)