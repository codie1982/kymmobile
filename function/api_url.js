import APPLICATION_KEY from "./key";
export default function getApiUrl($controller, $action, $parameters = []) {
  //http://grntsoftware.com/api/0123456789/api_category/get_category
  if ($parameters.length == 0) {
    return "http://68.183.220.159/api/" + APPLICATION_KEY + "/" + $controller + "/" + $action;
  } else {
    return "http://68.183.220.159/api/" + APPLICATION_KEY + "/" + $controller + "/" + $action + "/" + $parameters.join("/");

  }
}