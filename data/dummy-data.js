import Product from "../model/product"
import Category from "../model/category"
import getApiUrl from "../function/api_url"

export const PRODUCTS = [
  new Product('1', 'yemek1', 'Yemek Açıklama 1', '1'),
  new Product('2', 'yemek2', 'Yemek Açıklama 2', '5'),
  new Product('3', 'yemek3', 'Yemek Açıklama 3', '10'),
  new Product('4', 'yemek4', 'Yemek Açıklama 4', '8'),
  new Product('5', 'yemek5', 'Yemek Açıklama 5', '7'),
  new Product('6', 'yemek6', 'Yemek Açıklama 6', '6'),
];

export const _CATEGORIES = [
  new Category('c1', 'Italian', '#f5428d'),
  new Category('c2', 'Quick & Easy', '#f54242'),
  new Category('c3', 'Hamburgers', '#f5a442'),
  new Category('c4', 'German', '#f5d142'),
  new Category('c5', 'Light & Lovely', '#368dff'),
  new Category('c6', 'Exotic', '#41d95d'),
  new Category('c7', 'Breakfast', '#9eecff'),
  new Category('c8', 'Asian', '#b9ffb0'),
  new Category('c9', 'French', '#ffc7ff'),
  new Category('c10', 'Summer', '#47fced')
];

export const categories = async () => {
  // let response = await fetch(getApiUrl("api_category", "get_category", [0, 1, 1]));
  // let responseJson = await response.json();
  // 
  // console.log(responseJson)
  // return responseJson.active_category_list
  return true



}

export default subSliderData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
  },
]

export const MAINSLIDERIMAGES = [
  'https://source.unsplash.com/1024x768/?nature',
  'https://source.unsplash.com/1024x768/?water',
  'https://source.unsplash.com/1024x768/?girl',
  'https://source.unsplash.com/1024x768/?tree'
]