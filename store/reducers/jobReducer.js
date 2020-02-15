import { AsyncStorage } from "react-native";
let initialState = {
  jobID: "",
  status: "",
  job_detail: {},
  productID: "",
  jobloading: true,
  addCardLoading: false,
  adding: false,
  job_total_price: "",
  total_price_fixed: "",
  total_price_unit: "",
  job_product_list: [],
  job_complete_data: {},
  job_complete_process: false,
  complete_error: false,
  send_socket: false

}

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CARD":
      _storeData = async (jobID) => {
        try {
          await AsyncStorage.setItem('jobID', jobID);
        } catch (error) { }
      };
      _storeData(action.new_jobid);

      //      nstate.job_detail = action.info.customer_tags;
      return Object.assign({}, state, {
        status: true,
        jobID: action.new_jobid,
        error: false,
        job_total_price: action.new_job_total_price,
        total_price_fixed: action.new_total_price_fixed,
        total_price_unit: action.new_total_price_unit,
        job_product_list: action.new_job_product_list,
        jobloading: false,
        message: action.message,
        job_complete_prosess: false,
        send_socket: false
      })
    case "NO_JOB":
      _storeData = async () => {
        try {
          await AsyncStorage.removeItem('jobID');
        } catch (error) { }
      };
      _storeData();
      return state;

    case "JOB_DETAIL":
      return Object.assign({}, state, {
        status: false,
        jobID: action.jobID,
        job_total_price: action.job_total_price,
        total_price_fixed: action.total_price_fixed,
        total_price_unit: action.total_price_unit,
        job_product_list: action.new_job_product_list,
        error: false,
        jobloading: false,
        send_socket: false,
        message: action.message,
      })
    case "ISLOADING":
      return Object.assign({}, state, { jobloading: action.isloading })
    case "SET_STATUS":
      return Object.assign({}, state, { status: action.status })
    case "ADDCARDLOADING":
      return Object.assign({}, state, { addCardLoading: action.loading, job_detail: {} })

    case "REMOVE_ITEM":
      return Object.assign({}, state, {
        status: true,
        error: false,
        job_total_price: action.new_job_total_price,
        total_price_fixed: action.new_total_price_fixed,
        total_price_unit: action.new_total_price_unit,
        job_product_list: action.new_job_product_list,
        jobloading: false,
        message: action.message,
      })
    case "REMOVE_JOB":
      _storeData = async () => {
        try {
          await AsyncStorage.removeItem('jobID');
        } catch (error) { }
      };
      _storeData();
      return Object.assign({}, state, {
        status: false,
        job_total_price: 0,
        total_price_fixed: 0,
        total_price_unit: "",
        job_product_list: [],
        error: false,
        jobloading: false,
        message: action.message,
      })
    case "JOB_COMPLETE_DATA":

      const nstate = state;
      nstate.job_complete_prosess = false;
      nstate.job_complete_data["job_id"] = action.job_complete_data.job_id;
      nstate.job_complete_data["payment_method"] = action.job_complete_data.selected_payment_method;
      if (action.job_complete_data.selected_payment_method == "KK")
        nstate.job_complete_data["credi_card"] = action.job_complete_data.selected_credi_card;

      if (action.job_complete_data.selected_payment_method == "KO")
        nstate.job_complete_data["payment_method_opiton"] = action.job_complete_data.selected_atthedor_options;

      nstate.job_complete_data["extra_price"] = action.job_complete_data.selected_payment_method_extra_price;
      nstate.job_complete_data["extra_price_unit"] = action.job_complete_data.selected_payment_method_extra_price_unit;

      nstate.job_complete_data["delivery_method"] = action.job_complete_data.selected_delivery_method_type;
      nstate.job_complete_data["delivery_price"] = action.job_complete_data.selected_delivery_price;
      nstate.job_complete_data["delivery_price_unit"] = action.job_complete_data.selected_delivery_price_unit;
      nstate.job_complete_data["location_price"] = action.job_complete_data.selected_delivery_location_price;
      nstate.job_complete_data["customer_adres"] = action.job_complete_data.selected_customer_adres;
      nstate.job_complete_data["job_price"] = action.job_complete_data.job_price;
      
      if (typeof action.job_complete_data.job_note != "undefined")
        nstate.job_complete_data["job_note"] = action.job_complete_data.job_note;
      return Object.assign({}, state, nstate);
    case "JOB_COMPLETE":
      //iş id sini sistemden kaldır
      //iş complete_data temizle
      // jobID:
      _storeData = async () => {
        try {
          await AsyncStorage.removeItem('jobID');
        } catch (error) { }
      };
      _storeData();

      return Object.assign({}, state, {
        job_complete_process: true,
        send_socket: true,
        job_total_price: 0,
        total_price_fixed: 0,
        total_price_unit: "",
        job_product_list: [],
        message: action.message, complete_error: false,
      });
    case "JOB_COMPLETE_ERROR":
      return Object.assign({}, state, { send_socket: false, job_complete_process: true, complete_error: true, message: action.message });
    case "JOB_COMPLETE_PROCESS":
      return Object.assign({}, state, { send_socket: false, job_complete_process: action.process });
    case "ADDING":
      return Object.assign({}, state, { adding: action.itemadding })
    default:
      return state;
  }
}

export default jobReducer;