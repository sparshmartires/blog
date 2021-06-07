import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};
// import { createStore } from "redux";

// const initialState = {
//   sidebarShow: "responsive",
// };

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case "set":
//       return { ...state, ...rest };
//     default:
//       return state;
//   }
// };
// const enhancers = [changeState, applyMiddleware(thunk)];
// const store = createStore(changeState);
// export default store;

// export default
const pReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
export const store = createStore(
  pReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);
// const store = createStore(rootReducer, applyMiddleware(thunk));

// the value from combineReducers

//  const store = createStore(pReducer);
// export  store;
export const persistor = persistStore(store);
