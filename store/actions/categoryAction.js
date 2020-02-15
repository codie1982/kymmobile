import axios from "axios";
import getApiUrl from "../../function/api_url"
export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST';

export const getCategoryList = () => {
  return async dispatch => {
    const response = await fetch(getApiUrl("apicategory", "getcategory"))
    const data = await response.json()
    const loadCategory = []
    const gtdt = data.category

    for (let i = 0; i < Object.keys(gtdt).length; i++) {
      let cat = {
        id: gtdt[i].category_id,
        parent_id: gtdt[i].parent_category_id,
        name: gtdt[i].category_name,
        description: gtdt[i].category_description,
        keywords: gtdt[i].category_keywords,
      }
      loadCategory.push(cat)
    }

    dispatch({ type: GET_CATEGORY_LIST, category_list: loadCategory })
  }
}