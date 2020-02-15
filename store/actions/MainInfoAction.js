import getApiUrl from "../../function/api_url"
export const getApplicationInfo = () => {
  return async dispatch => {
    //console.log(getApiUrl("apicustomerapplication", "getapplicationinfo"))
    const response = await fetch(getApiUrl("apicustomerapplication", "getapplicationinfo"))
    const data = await response.json()
    dispatch({ type: "GET_APPLICATION_INFO", application_detail: data.application_data })
  }
}
export const setLoading = (loading) => {
  return async dispatch => {
    dispatch({ type: "LOADING", loading: loading })
  }
}



