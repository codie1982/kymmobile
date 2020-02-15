import React, { Component, useState, useEffect, } from "react";
import {
  View, Text, Picker, Button,
  CheckBox,
  Modal, Alert,
  TextInput
} from "react-native";


import { SliderBox } from "react-native-image-slider-box";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../assets/constant/Colors"



function Mainslider(props) {
  const [imagelist, setimagelist] = useState([])
  const [selectImage, setselectImage] = useState(null)
  const avalibleSlider = useSelector(state => state.imageSlider.fullimageSlider)


  useEffect(() => {
    if (selectImage != null) {

      if (avalibleSlider[selectImage].redirect_screen_type == "category") {
        props.navigation.navigate({
          routeName: 'productList',
          params: {
            selected_category_id: avalibleSlider[selectImage].redirect_screen,
            selected_category: { name: avalibleSlider[selectImage].category_name }
          }
        })
      } else if (avalibleSlider[selectImage].redirect_screen_type == "product") {
        console.log(avalibleSlider[selectImage])
        const param_product_info = {
          id: avalibleSlider[selectImage].product_id,
          product_name: avalibleSlider[selectImage].product_name,
          product_sales_price: avalibleSlider[selectImage].product_sales_price,
          product_sub_name: avalibleSlider[selectImage].product_sub_name,
          product_unit: avalibleSlider[selectImage].product_unit
        }
      
        props.navigation.navigate({
          routeName: 'productDetail',
          params: {
            product_info: param_product_info
          }
        })
      }
    }
  }, [selectImage])

  useEffect(() => {
    let slider_list = []
    for (let i = 0; i < avalibleSlider.length; i++) {
      slider_list.push(avalibleSlider[i].url)
    }
    setimagelist(slider_list)
  }, [])

  return (
    <SliderBox
      images={imagelist}
      sliderBoxHeight={200}
      onCurrentImagePressed={index => setselectImage(index)}
      dotColor={Colors.sliderActiveDots}
      inactiveDotColor={Colors.sliderInactiveDots}
    />
  )

}
// console.warn(`image ${index} pressed`)
export default Mainslider;