
let initialState = {
  province_list: [],
  district_list: [],
  neighborhood_list: [],
  error_type: "",
  message: "",
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROVINCE_LIST":
      return Object.assign({}, state, { province_list: action.province_list, message: action.message })
    case "GET_DISTRICT_LIST":
      return Object.assign({}, state, {
        district_list: action.district_list,
        neighborhood_list: [],
        message: action.message
      })
    case "GET_NEIGHBORHOOD_LIST":
      return Object.assign({}, state, {
        neighborhood_list: action.neighborhood_list,
        message: action.message
      })
    case "NO_DISCRIT":
      return Object.assign({}, state, { district_list: [], neighborhood_list: [], message: action.message })
    default:
      return state
  }
}

export default userReducer;
