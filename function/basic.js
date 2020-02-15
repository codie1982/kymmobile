

export const UpperString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const Rate = (value, rate) => {
  return parseFloat(value) * (parseFloat(rate) / 100);
}

export const calculateOption = (price, direction, type, value) => {
  if (value != 0) {
    if (direction == "increase") { //Arttrımak
      if (type == "minus") { //sayısal
        return parseFloat(price) + parseFloat(value)
      } else if (type == "rate") {//Oransal
        return parseFloat(price) + Rate(price, value)
      }
    } else if (direction == "decrease") {//Azaltmak
      if (type == "minus") {//Sayısal
        return parseFloat(price) - parseFloat(value)
      } else if (type == "rate") {//Oransal
        return parseFloat(price) - Rate(price, value)
      }
    }
  } else {
    return price
  }
}

export const whereIsLocation = (delivery_location, customer_location) => {

  selected_delivery_location_id = [];
  let selected_index = 0;
  let ifound = false;

  for (let i = 0; i < delivery_location.length; i++) {
    if (typeof delivery_location[i].province != "undefined") {
      if (delivery_location[i].province == customer_location.province) {
        ifound = true
      } else {
        ifound = false
      }
    }
    if (typeof delivery_location[i].district != "undefined") {
      if (delivery_location[i].district == customer_location.district) {
        ifound = true
      } else {
        ifound = false
      }
    }

    if (delivery_location[i].neighborhood != 0) {
      if (delivery_location[i].neighborhood == customer_location.neighborhood) {
        ifound = true
      } else {
        ifound = false
      }
    }
    if (ifound) {
      selected_index = i;
      break;
    }
    selected_index = -1;
  }

  let result;
  if (selected_index != -1) {
    result = {
      state: ifound,
      founded_delivery_location: delivery_location[selected_index],
    }
  } else {
    result = {
      state: ifound,
      founded_delivery_location: null,
    }
  }
  return result
}

export const calculatePaymentExtraPrice = (price, payment_info) => {
  if (payment_info.value != 0) {
    return payment_info.price;
  } else {
    return 0
  }
}

export const calculateDeliveryLocation = (price, delivery_location_info) => {

  if (delivery_location_info.value != 0) {
    //Değer Arttırım ise
    if (delivery_location_info.direction == "increase") {
      //Değer Oransal Arttırım
      if (delivery_location_info.calculation_method == "rate") {
        return Rate(price, delivery_location_info.value)
      } else if (delivery_location_info.calculation_method == "value") {
        //Değer Miktar Arttırım
        return parseFloat(delivery_location_info.value)
      }
    } else {
      //Değer Azaltım ise
      if (delivery_location_info.calculation_method == "rate") {
        //Değer Oransal Azaltım
        return -1 * Rate(price, delivery_location_info.value)
      } else if (delivery_location_info.calculation_method == "value") {
        //Değer Miktar Azaltım
        return -1 * parseFloat(delivery_location_info.value)
      }
    }
  } else {
    //Değer 0 İse Etkin Değer Yok
    return 0
  }
}

export const calculateTotalJobPrice = (price, payment_method, delivery_price, location_price) => {
  //console.log("price, payment_method, delivery_price, location_price")
  //console.log(price, payment_method, delivery_price, location_price)
  return parseFloat(price) + parseFloat(payment_method) + parseFloat(delivery_price) + parseFloat(location_price)

}

export const get_delivery_method_type = (type) => {
  switch (type) {
    case "messenger":
      return "Kurye"
    case "cargo":
      return "Kargo"
    case "transport":
      return "Nakliye"
  }
}

