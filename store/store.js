import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

const appReducer = combineReducers({
  //all Reducers
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
