import axios from "axios";
import getApiUrl from "../../function/api_url"


export const getMainSliderInfo = () => {
  return async dispatch => {
     const response = await fetch(getApiUrl("apicustomerapplication", "getapplicationmainslider"))
     const data = await response.json()
    dispatch({ type: "GET_MAIN_SLIDER", slider: data.slider_data })
  }
}
