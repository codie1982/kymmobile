
let initialState = {
  fullimageSlider: []
}
const ImageSliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MAIN_SLIDER":
      return { ...state, fullimageSlider: action.slider };
    default:
      return state;
  }
}

export default ImageSliderReducer;
