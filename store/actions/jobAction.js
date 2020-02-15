import getApiUrl from "../../function/api_url"

export const addToCardloading = (state = false) => {
  return async dispatch => {
    dispatch({ type: "ADDCARDLOADING", addCardloading: state })
  }
}
export const isjobloading = (state = false) => {
  return async dispatch => {
    dispatch({ type: "ISLOADING", isloading: state })
  }
}
export const setStatus = (state = false) => {
  return async dispatch => {
    dispatch({ type: "SET_STATUS", status: state })
  }
}
export const adding = (state = false) => {
  return async dispatch => {
    dispatch({ type: "ADDING", itemadding: state })
  }
}
export const addToCard = (data) => {
  return async dispatch => {
    //console.log(JSON.stringify(data))
    //console.log(getApiUrl("apijob", "addtocard"))
    const rawResponse = await fetch(getApiUrl("apijob", "addtocard"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const res = await rawResponse.json();

    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error_type: res.type, message: res.message })
    } else {
      dispatch({
        type: "ADD_TO_CARD",
        new_jobid: res.jobid,
        new_job_detail: res.job_detail,
        new_job_total_price: res.job_detail.total_price,
        new_total_price_fixed: res.job_detail.total_price_fixed,
        new_total_price_unit: res.job_detail.total_price_unit,
        new_job_product_list: res.job_detail.job_products,
        message: res.message
      })
    }

  }
}
export const getJobDetails = (_jobID, _userID) => {
  return async dispatch => {
    const rawResponse = await fetch(getApiUrl("apijob", "getjobdetail"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ job_id: _jobID, customer_id: _userID })
    })
    const res = await rawResponse.json();

    if (typeof res.error !== "undefined" && res.error == true) {
      //console.log("Ekli Sipariş Yok")
      dispatch({ type: res.type, error_type: res.type, message: res.message })
    } else {

      //console.log("Sipariş Detayları")
      dispatch({
        type: "JOB_DETAIL",
        jobID: res.job_detail.job_id,
        job_detail: res.job_detail,
        job_total_price: res.job_detail.total_price,
        total_price_fixed: res.job_detail.total_price_fixed,
        total_price_unit: res.job_detail.total_price_unit,
        new_job_product_list: res.job_detail.job_products,
        message: res.message
      })
    }


  }
}
export const removeProductItem = (_jobProductID, _userID) => {
  return async dispatch => {
    //console.log(JSON.stringify({ job_product_id: _jobProductID, customer_id: _userID }))
    const rawResponse = await fetch(getApiUrl("apijob", "removejobproductitem"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ job_product_id: _jobProductID, customer_id: _userID })
    })
    const res = await rawResponse.json();
    //console.log(res)
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error_type: res.type, message: res.message })
    } else {
      if (res.type == "REMOVE_ITEM") {
        dispatch({
          type: "REMOVE_ITEM",
          new_job_detail: res.job_detail,
          new_job_total_price: res.job_detail.total_price,
          new_total_price_fixed: res.job_detail.total_price_fixed,
          new_total_price_unit: res.job_detail.total_price_unit,
          new_job_product_list: res.job_detail.job_products,
          message: res.message
        })
      } else if (res.type == "REMOVE_JOB") {
        dispatch({
          type: "REMOVE_JOB",
          message: res.message
        })
      }

    }

  }
}
export const removeJob = (_jobID, _userID) => {

  return async dispatch => {

    //console.log(JSON.stringify({ job_id: _jobID, customer_id: _userID }))
    const rawResponse = await fetch(getApiUrl("apijob", "removejob"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ job_id: _jobID, customer_id: _userID })
    })
    const res = await rawResponse.json();
    // console.log(res)
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error_type: res.type, message: res.message })
    } else {
      dispatch({
        type: "REMOVE_JOB",
        message: res.message
      })
    }
  }
}
export const set_job_complete_data = (data) => {
  return async dispatch => {
    dispatch({ type: "JOB_COMPLETE_DATA", job_complete_data: data })
  }
}
export const jobCompleteProsses = () => {
  return async dispatch => {
    dispatch({
      type: "JOB_COMPLETE_PROCESS",
      process: false
    })

  }
}
export const jobComplete = (data) => {
  return async dispatch => {

    //console.log(JSON.stringify(data))

    const rawResponse = await fetch(getApiUrl("apijob", "jobcomplete"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const res = await rawResponse.json();
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: "JOB_COMPLETE_ERROR", error_type: res.type, message: res.message })
    } else {
      dispatch({
        type: "JOB_COMPLETE",
        message: res.message
      })
    }

  }
}