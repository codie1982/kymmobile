import { GET_CATEGORY_LIST } from "../actions/categoryAction"
let initialState = {
  product_list: [],
  search_product_list: [],
  searching: false,
  no_search: false,
  favorite_product_list: [],
  product_detail: {},
  error: false,
  message: "",
  search_message: "",
  type: "",
  active_page: 1,
  last_page: "",
  pagePerProduct: "",
  isloading: false,
}
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_LIST":
      return Object.assign({}, state, {
        type: "GET_PRODUCT_LIST",
        product_list: action.product_list,
        error: false,
        message: action.message,
        active_page: action.active_page,
        last_page: action.last_page,
        pagePerProduct: action.pagePerProduct,
        open_pagination: action.open_pagination,
      })
    case "GET_PRODUCT_FAVORITE_LIST":
      return Object.assign({}, state, {
        type: "GET_PRODUCT_FAVORITE_LIST",
        favorite_product_list: action.favorite_product_list,
        error: false,
        message: action.message,
      })
    // return { ...state, type: "GET_PRODUCT_LIST", product_list: action.product_list, message: action.message };
    case "GET_PRODUCT_DETAIL":
      return Object.assign({}, state, {
        type: "GET_PRODUCT_DETAIL",
        product_detail: action.product_detail,
        error: false,
        message: action.message,
        active_page: action.active_page,
        last_page: action.last_page,
        pagePerProduct: action.pagePerProduct,
      })
    case "LOADING_START":
      return Object.assign({}, state, {
        type: "LOADING_START",
        product_list: [],
        error: false,
        isloading: true,
        message: action.message,
        open_pagination: false
      })
    case "LOADING_END":
      return Object.assign({}, state, {
        type: "LOADING_END",
        error: false,
        isloading: false,
      })

    case "NO_PRODUCTS":
      return Object.assign({}, state, {
        type: "NO_PRODUCTS",
        product_list: [],
        error: true,
        message: action.message,
      })
    case "NO_PRODUCT_ID":
      return Object.assign({}, state, {
        type: "NO_PRODUCTS",
        product_list: [],
        error: true,
        message: action.message,
      })
    case "NO_PRODUCT":
      return Object.assign({}, state, {
        type: "NO_PRODUCT",
        product_list: [],
        error: true,
        message: action.message,
      })
    case "NO_CATEGORY":
      return Object.assign({}, state, {
        type: "NO_CATEGORY",
        product_list: [],
        error: true,
        message: action.message,
      })
    case "NO_ACTION":
      return Object.assign({}, state, {
        type: "NO_ACTION",
        product_list: [],
        error: true,
        message: action.message,
      })
    case "NO_CONTROLLER":
      return Object.assign({}, state, {
        type: "NO_CONTROLLER",
        product_list: [],
        error: true,
        message: action.message,
      })
    case "NO_APIKEY":
      return Object.assign({}, state, {
        type: "NO_APIKEY",
        product_list: [],
        error: true,
        message: action.message,
      })
    case "SEARCHING":
      return Object.assign({}, state, {
        type: "SEARCHING",
        searching: action.searching,
      })
    case "SEARCH_PRODUCT_LIST":
      return Object.assign({}, state, {
        type: "SEARCH_PRODUCT_LIST",
        search_product_list: action.search_product_list,
        no_search: false,
        error: false,
        search_message: action.message,
      })
    case "NO_SEARCH":
      return Object.assign({}, state, {
        type: "NO_SEARCH",
        searching: false,
        no_search: true,
        search_product_list: [],
        error: false,
        search_message: action.message,
      })
    default:
      return state;
  }
}

export default productReducer;