import { AsyncStorage } from 'react-native';
let initialState = {
  user_info: {},
  error_type: "",
  message: "",
  customer_favorites_list: [],
  isFavoriteloading: false,
  ischecking: false,
  logout: true
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_CHECK":
      return Object.assign({}, state, { ischecking: action.check })
    case "USER_LOGIN":
      _storeData = async () => {
        try {
          await AsyncStorage.setItem('userID', action.user_info.customer_id);
        } catch (error) {
          // Error saving data
        }
      };
      _storeData();
      return Object.assign({}, state, { user_info: action.user_info, message: action.message })

    case "USER_REGISTER":
      _storeData = async () => {
        try {
          await AsyncStorage.setItem('userID', action.user_info.customer_id);
        } catch (error) {
          // Error saving data
        }
      };
      _storeData();
      return Object.assign({}, state, { user_info: action.user_info, message: action.message })
    case "GET_USER_DATA":
      return Object.assign({}, state, { user_info: action.user_info, message: action.message })
    case "ERROR":
      return Object.assign({}, state, { error_type: action.error_type, message: action.message })
    case "USER_LOGOUT":
      _storeData = async () => {
        try {
          await AsyncStorage.removeItem('userID');
        } catch (error) { }
      };
      _storeData();
      return Object.assign({}, state, {
        error_type: action.error_type, user_info: {},
        isFavoriteloading: false, customer_favorites_list: [],
        message: action.message
      })
    case "NO_ACCOUNT":
      _storeData = async () => {
        try {
          await AsyncStorage.removeItem('userID');
        } catch (error) { }
      };
      _storeData();
      return Object.assign({}, state, { error_type: action.error_type, message: action.message })
    case "NO_RECORD":
      _storeData = async () => { try { await AsyncStorage.removeItem('userID'); } catch (error) { } };
      _storeData();
      return Object.assign({}, state, { error_type: action.error_type, message: action.message })
    case "NO_COMPANY":
      _storeData = async () => { try { await AsyncStorage.removeItem('userID'); } catch (error) { } };
      _storeData();
      return Object.assign({}, state, { error_type: action.error_type, message: action.message })
    case "NO_PERSONEL_INFO":
      _storeData = async () => { try { await AsyncStorage.removeItem('userID'); } catch (error) { } };
      _storeData();
      return Object.assign({}, state, { error_type: action.error_type, message: action.message })
    case "ADD_USER_ADRES_PROVINCE":
      const nprovince = { province: action.province }
      return Object.assign({}, state, { user_adres_info: nprovince, message: action.message })
    case "ADD_USER_ADRES_DISCRIT":
      const ndiscrit = { discrit: action.discrit }
      return Object.assign({}, state, { user_adres_info: ndiscrit, message: action.message })
    case "ADD_USER_ADRES_NEIGHBORHOOD":
      const nneighborhood = { neighborhood: action.neighborhood }
      return Object.assign({}, state, { user_adres_info: nneighborhood, message: action.message })
    default:
      return state
  }
}

export default userReducer;
