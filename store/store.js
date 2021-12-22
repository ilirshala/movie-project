import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import getAllMoviesReducer from "./reducers/fetchMovies.reducer";

const appReducer = combineReducers({
  getAllMoviesReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
