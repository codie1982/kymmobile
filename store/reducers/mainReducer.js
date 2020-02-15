
let initialState = {
  info: {},
  settings: {},
  loading: false
}
const mainInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return Object.assign({}, state, { loading: action.loading })
    case "GET_APPLICATION_INFO":
      return Object.assign({}, state, { info: action.application_detail })
    default:
      return state
  }
}

export default mainInfoReducer;
