let initialState = {
  message: "",
  public: 1,
  sales: 1,
  isFavoriteloading: false,
  addState: false,
  error: null,
  customer_general: {
    customer_id: "",
    customer_personel_id: "",
    customer_email: "",
    customer_name: "",
    customer_lastname: "",
    customer_gender: "",
    customer_birth_day: "",
    customer_birth_month: "",
    customer_birth_year: "",
    customer_profession: "",
    customer_professional_duty: "",
    customer_idnumber: "",
  },
  customer_tags: [],
  customer_adress_list: [],
  customer_credi_card_list: [],
  customer_phone_list: [],
  customer_mail_list: [],
  customer_favorite_list: [],
  send_customer_adres: {
    adres_title: "",
    postcode: "",
    street: "",
    description: "",
    delivery: "",
    shipping: "",
    province: "",
    district: "",
    neighborhood: "",
    customer_id: "",
    primary_key: "",
  },
  send_customer_credicard: {
    card_title: "",
    month: "",
    year: "",
    card_number: "",
    security_number: "",
    customer_id: "",
    primary_key: ""
  },
  send_customer_phone: {
    phone_type: "",
    area_code: "",
    phone_number: "",
    customer_id: "",
    primary_key: ""
  }
}
let nstate;
const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CUSTOMER_DATA":
      nstate = state;

      nstate.customer_general["customer_id"] = action.customer_id;
      nstate.customer_general["customer_personel_id"] = action.info.customer_personel_id;
      nstate.customer_general["customer_email"] = action.info.customer_email;
      nstate.customer_general["customer_name"] = action.info.customer_name;
      nstate.customer_general["customer_lastname"] = action.info.customer_lastname;
      nstate.customer_general["customer_gender"] = action.info.customer_gender;
      nstate.customer_general["customer_birth_day"] = action.info.customer_birth_day;
      nstate.customer_general["customer_birth_month"] = action.info.customer_birth_month;
      nstate.customer_general["customer_birth_year"] = action.info.customer_birth_year;
      nstate.customer_general["customer_profession"] = action.info.customer_profession;
      nstate.customer_general["customer_professional_duty"] = action.info.customer_professional_duty;
      nstate.customer_general["customer_idnumber"] = action.info.customer_idnumber;


      nstate.customer_tags = action.info.customer_tags;
      nstate.customer_adress_list = action.info.customer_adress_list;
      nstate.customer_credi_card_list = action.info.customer_credi_card_list;
      nstate.customer_phone_list = action.info.customer_phone_list;
      nstate.customer_mail_list = action.info.customer_mail_list;
      nstate.customer_favorite_list = action.info.customer_favorite_list;
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "ADD_CUSTOMER_NEW_ADRES":
      nstate = state;
      nstate.customer_adress_list = action.customer_new_adres
      nstate.error = false;
      nstate.message = action.message;
      return Object.assign({}, state, nstate)
    case "ADD_CUSTOMER_NEW_CARD":
      nstate = state;
      nstate.customer_credi_card_list = action.customer_new_card
      nstate.error = false;
      nstate.message = action.message;
      return Object.assign({}, state, nstate)
    case "ADD_CUSTOMER_NEW_PHONE":
      nstate = state;
      nstate.customer_phone_list = action.customer_new_phone
      nstate.error = false;
      nstate.message = action.message;
      return Object.assign({}, state, nstate)
    case "NO_DESCRIPTION":
      nstate = state;
      nstate.error = true;
      nstate.message = action.message;
      return Object.assign({}, state, nstate)
    case "TOGGLE_FAVORITES":
      nstate = state;
      nstate.customer_favorite_list = action.favorite_list
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "FAVORITES_LOADING":
      return Object.assign({}, state, { isFavoriteloading: action.loading, message: action.message, error: false })
    case "CUSTOMER_ID_FORADRES":
      nstate = state;
      nstate.send_customer_adres["customer_id"] = action.customer_id
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_ID_FORCARD":
      nstate = state;
      nstate.send_customer_credicard["customer_id"] = action.customer_id
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_ID_FORPHONE":
      nstate = state;
      nstate.send_customer_phone["customer_id"] = action.customer_id
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_ADRES_PRIMARY_KEY":
      nstate = state;
      nstate.send_customer_adres["primary_key"] = action.primary_key
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_PROVINCE":
      nstate = state;
      nstate.send_customer_adres["province"] = action.province
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_DISTRICT":
      nstate = state;
      nstate.send_customer_adres["district"] = action.district
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_NEIGHBORHOOD":
      nstate = state;
      nstate.send_customer_adres["neighborhood"] = action.neighborhood
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_ADRES_TITLE":
      nstate = state;
      nstate.send_customer_adres["adres_title"] = action.adres_title
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_POSTCODE":
      nstate = state;
      nstate.send_customer_adres["postcode"] = action.postcode
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_STREET":
      nstate = state;
      nstate.send_customer_adres["street"] = action.street
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_ADRES_DESCRIPTION":
      nstate = state;
      nstate.send_customer_adres["description"] = action.description
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_DELIVERY":
      nstate = state;
      nstate.send_customer_adres["delivery"] = action.delivery
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_SHIPPING":
      nstate = state;
      nstate.send_customer_adres["shipping"] = action.shipping
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_CREDICARD_PRIMARY_KEY":
      nstate = state;
      nstate.send_customer_credicard["primary_key"] = action.primary_key
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_CREDICARD_TITLE":
      nstate = state;
      nstate.send_customer_credicard["card_title"] = action.card_title
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_CREDICARD_MONTH":
      nstate = state;
      nstate.send_customer_credicard["month"] = action.month
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_CREDICARD_YEAR":
      nstate = state;
      nstate.send_customer_credicard["year"] = action.year
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_CREDICARD_NUMBER":
      nstate = state;
      nstate.send_customer_credicard["card_number"] = action.card_number
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_CREDICARD_SECURTY_NUMBER":
      nstate = state;
      nstate.send_customer_credicard["security_number"] = action.security_number
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_PHONE_PRIMARY_KEY":
      nstate = state;
      nstate.send_customer_phone["primary_key"] = action.primary_key
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_PHONE_TYPE":
      nstate = state;
      nstate.send_customer_phone["phone_type"] = action.phone_type
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_PHONE_AREA_CODE":
      nstate = state;
      nstate.send_customer_phone["area_code"] = action.area_code
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "CUSTOMER_PHONE_NUMBER":
      nstate = state;
      nstate.send_customer_phone["phone_number"] = action.phone_number
      nstate.error = false;
      return Object.assign({}, state, nstate)

    case "REMOVE_CUSTOMER_ADRES":
      nstate = state;
      nstate.customer_adress_list = action.customer_adres_new_list
      nstate.error = false;
      return Object.assign({}, state, nstate)

    case "REMOVE_CUSTOMER_CREDICARD":
      nstate = state;
      nstate.customer_credi_card_list = action.customer_credicard_new_list
      nstate.error = false;
      return Object.assign({}, state, nstate)
    case "REMOVE_CUSTOMER_PHONE":
      nstate = state;
      nstate.customer_phone_list = action.customer_phone_new_list
      nstate.error = false;
      return Object.assign({}, state, nstate)
    default:
      return state
  }
}

export default customerReducer;
