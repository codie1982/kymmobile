import getApiUrl from "../../function/api_url"
export const addCustomerAdres = (customer_adres_info) => {
  return async dispatch => {

    const rawResponse = await fetch(getApiUrl("apicustomer", "addcustomeradres"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer_adres_info)
    })
    const res = await rawResponse.json();
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error: true, message: res.message })
    } else {
      dispatch({ type: "ADD_CUSTOMER_NEW_ADRES", customer_new_adres: res.customer_adres_data, message: res.message })
    }

  }
}
export const removeCustomerAdres = (customer_adres_id, customer_id) => {
  return async dispatch => {

    const rawResponse = await fetch(getApiUrl("apicustomer", "removecustomeradres"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customer_adres_id: customer_adres_id, customer_id: customer_id })
    })
    const res = await rawResponse.json();
    //console.log(res)
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error: true, message: res.message })
    } else {
      dispatch({ type: "REMOVE_CUSTOMER_ADRES", customer_adres_new_list: res.customer_adres_data, message: res.message })
    }

  }
}
export const addCustomerCrediCard = (customer_card_info) => {
  return async dispatch => {

    const rawResponse = await fetch(getApiUrl("apicustomer", "addcustomercredicard"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer_card_info)
    })
    const res = await rawResponse.json();
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error_type: res.type, message: res.message })
    } else {
      dispatch({ type: "ADD_CUSTOMER_NEW_CARD", customer_new_card: res.customer_card_data, message: res.message })
    }
  }
}
export const removeCustomerCrediCard = (customer_credi_card_id, customer_id) => {
  return async dispatch => {

    const rawResponse = await fetch(getApiUrl("apicustomer", "removecustomercredicard"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customer_credi_card_id: customer_credi_card_id, customer_id: customer_id })
    })
    const res = await rawResponse.json();
    //console.log(res)
  if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error: true, message: res.message })
    } else {
      dispatch({ type: "REMOVE_CUSTOMER_CREDICARD", customer_credicard_new_list: res.customer_credicard_data, message: res.message })
    }

  }
}
export const addCustomerPhoneNumber = (info) => {
  return async dispatch => {
    // console.log(JSON.stringify(info))
    // console.log(getApiUrl("apicustomer", "addcustomerphone"))
    const rawResponse = await fetch(getApiUrl("apicustomer", "addcustomerphone"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    const res = await rawResponse.json();
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error_type: res.type, message: res.message })
    } else {
      dispatch({ type: "ADD_CUSTOMER_NEW_PHONE", customer_new_phone: res.customer_phone_data, message: res.message })
    }
  }
}
export const removeCustomerPhoneNumber = (customer_phone_id, customer_id) => {
  return async dispatch => {
    const rawResponse = await fetch(getApiUrl("apicustomer", "removecustomerphone"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customer_phone_id: customer_phone_id, customer_id: customer_id })
    })
    const res = await rawResponse.json();
   // console.log(res)
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error: true, message: res.message })
    } else {
      dispatch({ type: "REMOVE_CUSTOMER_PHONE", customer_phone_new_list: res.customer_phone_data, message: res.message })
    }

  }
}
export const setCustomer_id = (customer_id) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_ID_FORADRES", customer_id: customer_id })
    dispatch({ type: "CUSTOMER_ID_FORCARD", customer_id: customer_id })
    dispatch({ type: "CUSTOMER_ID_FORPHONE", customer_id: customer_id })
  }
}
//Kullanıcı Adres Değerleri
export const setCustomerProvince = (province_id) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_PROVINCE", province: province_id })
  }
}
export const setCustomerDistrict = (district_id) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_DISTRICT", district: district_id })
  }
}
export const setCustomerNeighborhood = (neighborhood_id) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_NEIGHBORHOOD", neighborhood: neighborhood_id })
  }
}
export const setCustomerTitle = (title) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_ADRES_TITLE", adres_title: title })
  }
}
export const setCustomerPostCode = (postCode) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_POSTCODE", postCode: postCode })
  }
}
export const setCustomerStreet = (street) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_STREET", street: street })
  }
}
export const setCustomerAdresDescription = (description) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_ADRES_DESCRIPTION", description: description })
  }
}
export const setCustomerDeliveryAdres = (delivery) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_DELIVERY", delivery: delivery })
  }
}
//adresTitle, adresPKChangeText, adresSKChangeText, adresDesChangeText, deliveryAdres, shippingAdres
export const setCustomerShippingAdres = (shipping) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_SHIPPING", shipping: shipping })
  }
}
//Kullanıcı Kredi Kartı Değerleri
export const setCustomerCredicardTitle = (card_title) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_CREDICARD_TITLE", card_title: card_title })
  }
}
export const setCustomerCrediCardMonth = (month) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_CREDICARD_MONTH", month: month })
  }
}
export const setCustomerCrediCardYear = (year) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_CREDICARD_YEAR", year: year })
  }
}
export const setCustomerCrediCardNumber = (card_number) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_CREDICARD_NUMBER", card_number: card_number })
  }
}
export const setCustomerCrediCardSecurtyNumber = (security_number) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_CREDICARD_SECURTY_NUMBER", security_number: security_number })
  }
}
//Kullanıcı Telefon Değerleri
export const setCustomerPhoneType = (phone_type) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_PHONE_TYPE", phone_type: phone_type })
  }
}
export const setCustomerPhoneAreaCode = (area_code) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_PHONE_AREA_CODE", area_code: area_code })
  }
}
export const setCustomerPhoneNumber = (phone_number) => {
  return async dispatch => {
    dispatch({ type: "CUSTOMER_PHONE_NUMBER", phone_number: phone_number })
  }
}
export const getCustomerInfo = (customer_id) => {
  return async dispatch => {
    const rawResponse = await fetch(getApiUrl("apicustomer", "getcustomerinfo"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "customer_id": customer_id })
    })
    const res = await rawResponse.json();
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error: true, message: res.message })
    } else {
      dispatch({ type: "GET_CUSTOMER_DATA", info: res.customer_info, message: res.message, error: false })
    }
  }
}
export const addProductCustomerFavorites = (_product_id, _customer_id) => {
  return async dispatch => {

    dispatch({ type: "FAVORITES_LOADING", loading: true })
    //console.log(JSON.stringify({ product_id: _product_id, customer_id: _customer_id }))
    const rawResponse = await fetch(getApiUrl("apicustomer", "addtofavorites"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id: _product_id, customer_id: _customer_id })
    })
    const res = await rawResponse.json();
    //console.log(res)
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error_type: res.type, message: res.message })
    } else {
      dispatch({ type: "TOGGLE_FAVORITES", favorite_list: res.favorite_list, message: res.message })
    }
    dispatch({ type: "FAVORITES_LOADING", loading: false })
  }
}
export const removeProductCustomerFavorites = (_product_id, _customer_id) => {
  return async dispatch => {
    dispatch({ type: "FAVORITES_LOADING", loading: true })

    const rawResponse = await fetch(getApiUrl("apicustomer", "removetofavorites"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id: _product_id, customer_id: _customer_id })
    })
    const res = await rawResponse.json();
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error_type: res.type, message: res.message })
    } else {
      dispatch({ type: "TOGGLE_FAVORITES", favorite_list: res.favorite_list, message: res.message })
    }
    dispatch({ type: "FAVORITES_LOADING", loading: false })
  }
}