import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";

import Colors from "../assets/constant/Colors"
import { Ionicons } from "@expo/vector-icons"
import { SliderBox } from "react-native-image-slider-box";

class CategoryScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      language: "Java",
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree'
      ]
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={200}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
          />
          <ScrollView>
            <View style={styles.product_content}>
              <View style={styles.product}>
                <View style={styles.description}>
                  <View style={styles.topdescription}>
                    <View style={styles.title}><Text style={styles.title_text}>Adana Kebap</Text></View>
                    <View style={styles.price}><Text style={styles.price_text}>35.00 TL</Text></View>
                  </View>
                  <View style={styles.Bottomdescription}>
                    <View><Text style={styles.Bottomdescription_text} numberOfLines={4}>150gr Kebap yoğurtlu patlıcan,
                    ezme,çoban salata, mevsim yeşillikleri,közlenmiş domates,közlenmiş biber,
                    közlenmiş soğan ile servis edilir.</Text></View>
                  </View>
                </View>
                <TouchableOpacity onPress={()=>{console.warn("Deneme")}}>
                  <View style={styles.addJob}>
                    <View style={styles.addJobtn}><Text style={styles.addJobtitle} numberOfLines={2}>Sipariş Ver</Text></View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  section: {},
  product_content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  product: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  description: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  topdescription: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },
  title: { flex: 2 },
  title_text: { fontFamily: "mclaren", fontSize: 16, fontWeight: "500", color: Colors.primaryColor },
  price: { flex: 1 },
  price_text: { fontFamily: "mclaren", fontSize: 14, fontWeight: "700", color: Colors.primaryColor },
  Bottomdescription: { flex: 1 },
  Bottomdescription_text: { fontFamily: "mclaren", fontSize: 12, fontWeight: "300", color: Colors.textColor },
  addJob: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
  },
  addJobtn: {},
  addJobtitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    padding: 10,
    textAlign: "center",
    lineHeight: 30
  }
})

export default CategoryScreen