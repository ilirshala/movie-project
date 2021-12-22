import api from "../../pages/api/api";

export const GET_MOVIE = "GET_MOVIE";
export const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS";
export const GET_MOVIE_FAIL = "GET_MOVIE_FAIL";

export const fetchMovies = () => {
  return async (dispatch) => {
    dispatch({ type: GET_MOVIE });
    try {
      const response = await api.get("/films");

      if (response.status === 200) {
        dispatch({ type: GET_MOVIE_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: GET_MOVIE_FAIL, payload: response.data.error });
      }
    } catch (error) {
      dispatch({ type: GET_MOVIE_FAIL, payload: error.message });
    }
  };
};
