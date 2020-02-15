import getApiUrl from "../../function/api_url"

export const getProvince = () => {
  return async dispatch => {
    //console.log(getApiUrl("apiadres", "getprovincelist"))
    const response = await fetch(getApiUrl("apiadres", "getprovincelist"))
    const data = await response.json()
    if (data.error) {
      dispatch({ type: data.type, error: true, message: data.message })
    } else {
      dispatch({ type: "GET_PROVINCE_LIST", province_list: data.province_list, message: data.message })
    }
  }
}

export const getDistrict = (province_id) => {
  return async dispatch => {
    //   console.log(getApiUrl("apiadres", "getdiscritlist", [province_id]))
    const response = await fetch(getApiUrl("apiadres", "getdiscritlist", [province_id]))
    const data = await response.json()

    if (data.error) {
      dispatch({ type: data.type, error: true, message: data.message })
    } else {
      dispatch({
        type: "GET_DISTRICT_LIST",
        district_list: data.district_list,
        message: data.message
      })
    }
  }
}

export const getNeighborhood = (province_id, district_id) => {
  return async dispatch => {
    //console.log(getApiUrl("apiadres", "getneighborhoodlist"))
    const response = await fetch(getApiUrl("apiadres", "getneighborhoodlist", [province_id, district_id]))
    const data = await response.json()
    dispatch({
      type: "GET_NEIGHBORHOOD_LIST",
      neighborhood_list: data.neighborhood_list,
      message: data.message
    })
  }
}
