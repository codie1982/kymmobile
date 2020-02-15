import React, { useState } from 'react';
import { NetInfo } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { useScreens } from "react-native-screens";

import { createStore, combineReducers, applyMiddleware } from "redux";

import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import Navigate from "./navigation/navigate";

import applicationReducer from "./store/reducers/mainReducer";
import categoryReducer from "./store/reducers/categoryReducer";
import imageSliderReducer from "./store/reducers/imageSliderReducer";
import productReducer from "./store/reducers/productReducer";
import userReducer from "./store/reducers/userReducer";
import jobReducer from "./store/reducers/jobReducer";
import settingsReducer from "./store/reducers/settingsReducer";
import adresReducer from "./store/reducers/adresReducer";
import customerReducer from "./store/reducers/customerReducer";

//useScreens();

const rootReducer = combineReducers({
  info: applicationReducer,
  category: categoryReducer,
  imageSlider: imageSliderReducer,
  products: productReducer,
  user_info: userReducer,
  jobInfo: jobReducer,
  settings: settingsReducer,
  adres_info: adresReducer,
  customer_information: customerReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync(
    {
      'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
      'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf"),
      'roboto': require("./assets/fonts/Roboto-Regular.ttf"),
      'roboto-bold': require("./assets/fonts/Roboto-Bold.ttf"),
      'mclaren': require("./assets/fonts/McLaren-Regular.ttf")
    }
  )
}

export default function App() {
  const [fontloaded, setFontloaded] = useState(false);
  if (!fontloaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setFontloaded(true) }} />
  } else {
    NetInfo.isConnected.addEventListener("connectionChange", (res) => {
    })
    return <Provider store={store}><Navigate /></Provider>
  }
}
