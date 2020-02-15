import { GET_CATEGORY_LIST } from "../actions/categoryAction"
let initialState = {
  fullcategory: [],
  screen: "",
  test: "",
}
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_LIST:
        return { ...state, fullcategory: action.category_list };
    default:
      return state;
    }
  }
  
  export default categoryReducer;