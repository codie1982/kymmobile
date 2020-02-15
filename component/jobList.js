import React from "react";
import {
  View, Text, TouchableOpacity
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import styles from "../assets/styles";
import Carousel from 'react-native-snap-carousel';



function JobList(props) {
  const customer_favorites_list = useSelector(state => state.customer_information.customer_favorite_list)

  const SubSliderItem = (data, index) => {
    //const fv = customer_favorites.find((favid) => favid.product_id == data.item.id)
    //console.log(fv)



    var found = customer_favorites_list.find(function (element) {
      return element.id == data.item.id;
    });


    return <View style={{
      width: 150, height: 150, borderRadius: 50 / 2, borderColor: "#e8e8e8",
      borderWidth: 1, backgroundColor: "#F7F7F7", justifyContent: "center", alignItems: "center"
    }}>
      <View style={{ borderBottomWidth: 1, borderColor: props.colors.primary_color }}>
        <Text style={{ fontWeight: "500", fontSize: 16, lineHeight: 16 }}>{data.item.product_name}</Text>
      </View>
      <View >
        <Text >{data.item.product_sales_price} {data.item.product_unit}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({
              routeName: "productDetail", params: {
                product_info: data.item,
                customer_favorite: typeof found != "undefined" ? 1 : 0
              }
            })
          }}

          style={{
            padding: 10, marginTop: 10, margin: "auto", backgroundColor: props.colors.primary_color,
            marginBottom: 10, borderRadius: 20
          }}
        >
          <Text
            style={{
              textAlign: "center", fontSize: 16, fontFamily: "mclaren", fontWeight: "700",
              color: props.colors.text_color,
            }}
          >Sepete Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  }
  return (
    <View style={styles.row}>
      <View style={styles.col1}>
        <View style={{
          width: "100%",
          backgroundColor: "#ffffff"
        }}>
          <View style={{
            padding: 10,
          }}>
            {props.title != "" ?
             <Text tyle={{ width: "100%", backgroundColor: "#ffffff", color: props.colors.text_color, fontFamily: "mclaren", fontSize: 16 }}>{props.title}</Text> : null}
          </View>
          {typeof props.data != "undefined" && props.data.length != 0 ?
            <View style={{ flexDirection: "row", width: "100%", backgroundColor: "#ffffff", padding: 10, }}>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={props.data}
                renderItem={SubSliderItem}
                sliderWidth={300}
                itemWidth={150}
              />
            </View>
            :
            <View style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: props.colors.primary_color,
              padding: 10,
              borderRadius: 3
            }}>
              <Text style={{ color: props.colors.text_color }}>{props.negatif_answer}</Text>
            </View>
          }
        </View>
      </View>
    </View >
  )

}

export default JobList;