let initialState = {
  settings: {},

}
const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_APPLICATION_SETTINGS":
      return Object.assign({}, state.settings, action.settings)
    default:
      return state
  }
}

export default settingsReducer;
