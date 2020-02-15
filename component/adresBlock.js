import React, { useState, useEffect, } from "react";
import {
  View, Picker,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import styles from "../assets/styles";

import * as AdresActions from "../store/actions/adresActions"
import * as customerAction from "../store/actions/customerAction"

function AdresBlock() {
  const adres_info = useSelector(state => state.adres_info)


  const province_list = adres_info.province_list
  const district_list = adres_info.district_list
  const neighborhood_list = adres_info.neighborhood_list

  const [province, setProvince] = useState("---");
  const [district, setDistrict] = useState("---");
  const [neighborhood, setNeighborhood] = useState("---");

  const dispatch = useDispatch()
  useEffect(() => {
    const getDistrict = async (province) => {
      await dispatch(AdresActions.getDistrict(province))
      await dispatch(customerAction.setCustomerProvince(province))
    }
    getDistrict(province)
  }, [province])
  useEffect(() => {
    const getNeighborhood = async () => {
      await dispatch(AdresActions.getNeighborhood(province, district))
      await dispatch(customerAction.setCustomerDistrict(district))
    }
    getNeighborhood()
  }, [district])

  
  useEffect(() => {
    const setNB = async () => {
      await dispatch(customerAction.setCustomerNeighborhood(neighborhood))
    }
    setNB()
  }, [neighborhood])

  return (
    <View style={styles.row}>
      <View style={styles.col1}>
        {typeof province_list !== "undefined" ?
          <Picker style={styles.picker}
            selectedValue={province}
            onValueChange={(itemValue) =>
              setProvince(itemValue)
            }
          >
            <Picker.Item label="İl Seçimi Yapınız" value="---" />
            {province_list.map((item, index) =>
              <Picker.Item key={index} label={item.label} value={item.value} />
            )}
          </Picker>
          : null}
      </View>
      <View style={styles.col1}>
        {typeof district_list !== "undefined" ?
          <Picker style={styles.picker}
            selectedValue={district}
            onValueChange={(itemValue, itemIndex) =>
              setDistrict(itemValue)

            }>
            <Picker.Item label="İlçe Seçimi Yapınız" value="---" />
            {district_list.map((item, index) =>
              <Picker.Item key={index} label={item.label} value={item.value} />
            )}
          </Picker>
          : null}
      </View>

      <View style={styles.col1}>
        {typeof neighborhood_list != "undefined" ?
          <Picker style={styles.picker}
            selectedValue={neighborhood}
            onValueChange={(itemValue, itemIndex) =>
              setNeighborhood(itemValue)
            }>
            <Picker.Item label="Mahalle Seçimi Yapınız" value="---" />
            {neighborhood_list.map((item, index) =>
              <Picker.Item key={index} label={item.label} value={item.value} />
            )}
          </Picker>
          : null}
      </View>
    </View>

  )
}

export default AdresBlock
