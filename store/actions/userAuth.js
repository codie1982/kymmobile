import getApiUrl from "../../function/api_url"

export const userLogin = (loginData) => {
  return async dispatch => {
    const rawResponse = await fetch(getApiUrl("apiauth", "userlogin"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    const res = await rawResponse.json();
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: "ERROR", error_type: res.type, message: res.message })
    } else {
      dispatch({ type: "USER_LOGIN", user_info: res.customer_info })
    }
  }
}

export const userChecking = (state) => {
  return async dispatch => {
    dispatch({ type: "USER_CHECK", check: state })
  }
}

export const userLogout = () => {
  return async dispatch => {
    dispatch({ type: "USER_LOGOUT", user_info: {} })
  }
}

export const userRegister = (registerData) => {
  return async dispatch => {
    const rawResponse = await fetch(getApiUrl("apiauth", "userregister"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    })
    const res = await rawResponse.json();
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: "ERROR", error_type: res.type, message: res.message })
    } else {
      dispatch({ type: "USER_REGISTER", user_info: res.customer_info })
    }
  }
}

