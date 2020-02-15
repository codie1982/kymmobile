//import { AsyncStorage } from 'react-native';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '../assets/constant/Colors';

// state = {};
// const getColor = async () => {
//  state.color = await AsyncStorage.getItem("primary_color")
// };
// getColor()
// console.log(state.color)
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    width: "90%",
    alignItems: "center",
  },
  sliderContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mainSlider: {
    width: "100%",
    height: 220,
    backgroundColor: "white"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    minHeight: 40,
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 2,
  },
  col3: {
    flex: 3,
  },
  fillButton: {
    marginTop: 10,
    width: "90%",
    minHeight: 40,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  fillButtonText: {
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
    fontFamily: "mclaren",
    fontWeight: "700"
  },
  borderButton: {
    marginTop: 10,
    width: "90%",
    minHeight: 40,
    backgroundColor: "#ffffff",
    borderColor: Colors.primaryColor,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  borderButtonText: {
    color: Colors.textColor,
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
    fontFamily: "mclaren",
    fontWeight: "700"
  },
  h1: {
    fontSize: 22,
    fontWeight: "700"
  },
  h2: {
    fontSize: 20,
    fontWeight: "600"
  },
  h3: {
    fontSize: 18,
    fontWeight: "500"
  },
  h4: {
    fontSize: 16,
    fontWeight: "400"
  },
  h5: {
    fontSize: 14,
    fontWeight: "300"
  },
  checkBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
  },
  picker: {
    flex: 1,
    height: 50,
    fontSize: 20,
    lineHeight: 50,
    textAlign: "center",
    fontWeight: "700",
  },
  addNewAdresButton: {
    height: 40,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    padding: 5
  },
  addNewAdresButtonText: {
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 35,
    textAlign: "center",
    fontWeight: "700",
  },
  addIcon: {
    color: "#ffffff",
    fontSize: 25,
    lineHeight: 25,
    textAlign: "center",
  },
  modalContent: {
    width: "90%",
  },
  product: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
  },
  productItemdescription: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  topdescription: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: { flex: 1 },
  title: { flex: 5 },
  title_text: { fontFamily: "mclaren", fontSize: 16, fontWeight: "500" },
  price: { flex: 1 },
  price_text: { fontFamily: "mclaren", fontSize: 14, fontWeight: "700" },
  Bottomdescription: {width:"100%" },
  Bottomdescription_text: {
    fontFamily: "mclaren", fontSize: 12, fontWeight: "300", color: Colors.textColor,
  },
  addJob: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  addJobtitle: {
    fontSize: 18,
    fontWeight: "500",
    padding: 10,
    textAlign: "center",
    lineHeight: 30
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    borderWidth: 0.5,
    marginTop: 5,
    backgroundColor: "#ffffff",
    minHeight: 40,
  },
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
  },
  jobDescriptionContent: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 5,
    borderBottomWidth: 0.5,
    marginTop: 5,
  },
  descriptionsection: {
    flexDirection: "row",
  },
  descriptionhelp: {
    width: "100%"
  },
  description: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    marginTop: 5,
    backgroundColor: "#ffffff",
  },
  modalContent: {
    width: "90%",
  },
  addNewAdresButton: {
    height: 40,
    borderRadius: 10,
    padding: 5
  },
  addNewAdresButtonText: {
    fontSize: 15,
    lineHeight: 35,
    textAlign: "center",
    fontWeight: "700",
  },
  addIcon: {
    fontSize: 25,
    lineHeight: 25,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 22,
    lineHeight: 35,
    fontWeight: "700",
  },
  jobText: {
    fontSize: 14,
    lineHeight: 30,
    fontWeight: "300",
  },
  helpText: {
    fontSize: 12,
    textAlign: "left"
  },
  jobCompleteSection: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  jobComplete: {
    width: "90%",
    backgroundColor: "#3fcb30",
    borderRadius: 10,
  },
  jobCompleteText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "mclaren",
    color: "white",
    lineHeight: 35,
  }

})