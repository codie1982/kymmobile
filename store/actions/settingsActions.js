import getApiUrl from "../../function/api_url"

export const getApplicationSettings = () => {
  return async dispatch => {
    //console.log(getApiUrl("apisettings", "getapplicationsettings"))
    const response = await fetch(getApiUrl("apisettings", "getapplicationsettings"))
    const data = await response.json()
    dispatch({ type: "GET_APPLICATION_SETTINGS", settings: data, message: data.message })
  }
}
