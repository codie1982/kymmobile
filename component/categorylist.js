import React, { useState, useEffect} from "react";
import {
  View, Text, Picker,ScrollView,
  TouchableOpacity, Alert,TouchableHighlight,
  StyleSheet,Platform
} from "react-native";

import styles from "../assets/styles";

import { useSelector } from "react-redux";

import ModalDropdown from "react-native-modal-dropdown";
function categorylist(props) {

  const avalibleCategorylist = useSelector(state => state.category.fullcategory)
  const [category, setCategory] = useState("---")
  const [category_id, setCategoryID] = useState(0)

  useEffect(() => {
    //console.log(avalibleCategorylist)
  }, [])
  const _dropdown_2_renderRow=(rowData, rowID, highlighted)=> {

    //console.log(rowData, rowID, highlighted)
    let evenRow = rowID % 2;

    return (
      <TouchableHighlight>
        <View style={[nstyles.dropdown_2_row, {backgroundColor: evenRow ? '#f7f7f7' : '#ffffff'}]}>
          <Text style={[nstyles.dropdown_2_row_text, highlighted && {color: props.colors.text_color}]}>
            {`${rowData.name.toUpperCase()}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  const _dropdown_2_renderButtonText = (rowData) =>{
    const {name,id,description,keywords,parent_id} = rowData;
    setCategory(id)
    return `${name.toUpperCase()}`;
  }
  const _dropdown_2_renderSeparator=(sectionID, rowID, adjacentRowHighlighted)=> {
   // console.log(sectionID, rowID, adjacentRowHighlighted)
    let key = `spr_${rowID}`;
    return (<View style={nstyles.dropdown_2_separator}
                  key={key}/>);
  }

  useEffect(() => {
    if (category_id != 0) {
      if (category_id !== "---") {
        const selectCategory = avalibleCategorylist.find(cat => cat.id === category_id)
        props.navigation.navigate({
          routeName: 'productList',
          params: {
            selected_category_id: category_id,
            selected_category: selectCategory
          }
        })
      } else {
        Alert.alert(
          'Bir Kategori Seçin',
          'Erişmek istediğiniz ürün listesi için öncelikle kategori listesinden bir kategori seçiniz',
          [
            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
          ]
        )

      }
    }
  }, [category_id])

  return (
    <View style={styles.row}>
      <View style={styles.col2}>
        <ModalDropdown 
          style={nstyles.dropdown_2}
          textStyle={nstyles.dropdown_2_text}
          dropdownStyle={nstyles.dropdown_2_dropdown}
          options={avalibleCategorylist}
          defaultValue='Kategori Seçin'
          renderButtonText={_dropdown_2_renderButtonText}
          renderRow={_dropdown_2_renderRow}
          renderSeparator={_dropdown_2_renderSeparator}
        />
      
      </View>
      <View style={styles.col1}>
        <TouchableOpacity style={{ ...styles.fillButton, backgroundColor: props.colors.primary_color }}
          onPress={() => setCategoryID(category)}>
          <Text style={{ ...styles.fillButtonText, color: props.colors.text_color }}>Git</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

const nstyles = StyleSheet.create({
  dropdown_2: {
    flex:1,
    alignSelf: 'flex-start',
    width: "100%"
  },
  dropdown_2_text: {
    position:"relative",
    marginTop:20,
    fontSize: 18,
    lineHeight:18,
    color: '#111111',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    position:"absolute",
    top:0,
    left:0,
    width: "100%",
    height:300,
    marginTop:Platform.OS == "ios"?10:-5,
    marginLeft:0,
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown_2_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'navy',
    textAlignVertical: 'center',
  },
  dropdown_2_separator: {
    height: 1,
    backgroundColor: '#e1e1e1',
  }
})

/**
 * Picker Sistemi
 * <Picker selectedValue={category} style={{ ...styles.picker, color: props.colors.text_color }} onValueChange={(item) => setCategory(item)} >
          <Picker.Item key={0} label={props.title} value={"---"} />
          {typeof avalibleCategorylist != "undefined" ? avalibleCategorylist.map((item, index) =>
            <Picker.Item key={index} label={basicfunctions.UpperString(item.name)} value={item.id} />
          ) : <Picker.Item key={0} label={props.negative_answer} value={"---"} />}
        </Picker>
 */
export default categorylist;