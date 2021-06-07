import { combineReducers } from "redux";

import UserLogin from "./userlogin/reducer";
import changeState from "./hii/reducer";

export default combineReducers({
  userlogin: UserLogin,
  changeState: changeState,
});
