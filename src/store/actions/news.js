import * as actionTypes from "./actionTypes";
import axios from "../../axios-news";

export const fetchNewsInit = () => {
  return {
    type: actionTypes.FETCH_NEWS_INIT,
  };
};

//send newsData as payload to reducer
export const fetchNewsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_NEWS_SUCCESS,
    newsData: data,
  };
};

export const fetchNewsFailure = (error) => {
  return {
    type: actionTypes.FETCH_NEWS_FAILURE,
    error: error,
  };
};

export const fetchNews = (query, currentPage, pageLimit) => {
  return (dispatch) => {
    dispatch(fetchNewsInit());
    axios
      .get(
        `search?api-key=83f8a72f-b160-467b-ba44-a5d2555fa3ec&q=${query}&show-fields=thumbnail,headline&show-tags=keyword&page=${currentPage}&page-size=${pageLimit}`
      )
      .then((response) => {
        console.log(response);
        dispatch(fetchNewsSuccess(response.data.response));
      })
      .catch((error) => {
        dispatch(fetchNewsFailure(error));
      });
  };
};
