import getApiUrl from "../../function/api_url"


export const getProductList = (category_id, pageNumber) => {
  return async dispatch => {
    //console.log(getApiUrl("apiproduct", "getproductlist", [category_id]))
    const response = await fetch(getApiUrl("apiproduct", "getproductlist", [category_id, pageNumber]))
    const data = await response.json()

    if (data.type == "GET_PRODUCT_LIST") {
      dispatch({
        type: "GET_PRODUCT_LIST",
        product_list: data.product_list,
        message: data.message,
        active_page: data.active_page,
        last_page: data.last_page,
        pagePerProduct: data.perPage_product,
        open_pagination: data.open_pagination,
      })
    } else if (data.type == "NO_PRODUCTS") {
      dispatch({
        type: "NO_PRODUCTS", error: data.error, message: data.message
      })
    }


  }
}

export const getFavoriteProduct = () => {
  return async dispatch => {
    //console.log(getApiUrl("apiproduct", "getproductlist", [category_id]))
    const response = await fetch(getApiUrl("apiproduct", "getfavoritesproducts"))
    const data = await response.json()

    if (data.type == "GET_PRODUCT_FAVORITE_LIST") {
      dispatch({
        type: "GET_PRODUCT_FAVORITE_LIST",
        favorite_product_list: data.favorite_product_list,
        message: data.message,
      })
    } else if (data.type == "NO_PRODUCTS") {
      dispatch({
        type: "NO_PRODUCTS", error: data.error, message: data.message
      })
    }


  }
}

export const isLoading = (isloading) => {
  return async dispatch => {
    //console.log(getApiUrl("apiproduct", "getproductdetail", [product_id]))
    if (isloading) {
      dispatch({ type: "LOADING_START", message: "yükleniyor..." })
    } else {
      dispatch({ type: "LOADING_END" })
    }
  }
}

export const getProductDetail = (product_id) => {
  return async dispatch => {
    //console.log(getApiUrl("apiproduct", "getproductdetail", [product_id]))
    const response = await fetch(getApiUrl("apiproduct", "getproductdetail", [product_id]))
    const data = await response.json()
    const product = data.product_detail;
    dispatch({ type: data.type, product_detail: product, message: data.message })
  }
}

export const searching = (search_state) => {
  return async dispatch => {
    dispatch({ type: "SEARCHING", searching: search_state })
  }
}


export const searchProduct = (search_product) => {
  return async dispatch => {
    //console.log(getApiUrl("apiproduct", "getproductdetail", [product_id]))
    //console.log(JSON.stringify({ searct_text: search_product }))
    const rawResponse = await fetch(getApiUrl("apiproduct", "searchproduct"), {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ searct_text: search_product })
    })
    const res = await rawResponse.json();
    //console.log(res)
    if (typeof res.error !== "undefined" && res.error == true) {
      dispatch({ type: res.type, error_type: res.type, message: res.message })
    } else {
      dispatch({ type: "SEARCH_PRODUCT_LIST", search_product_list: res.search_product_list, message: res.message })
    }
  }
}






