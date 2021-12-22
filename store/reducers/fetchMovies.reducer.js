import {
  GET_MOVIE,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAIL,
} from "../actions/fetchMovies.actions";

const INITIAL_STATE = {
  movies: {},
  isLoading: false,
  errorMessage: "",
};

const fetchMovies = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOVIE: {
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    }
    case GET_MOVIE_SUCCESS: {
      return {
        ...state,
        movies: { ...action.payload },
        isLoading: false,
        errorMessage: "",
      };
    }
    case GET_MOVIE_FAIL: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};

export default fetchMovies;
