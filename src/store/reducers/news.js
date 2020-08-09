import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  newsData: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS_INIT:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_NEWS_SUCCESS:
      return updateObject(state, {
        newsData: action.newsData,
        error: null,
        loading: false,
      });

    case actionTypes.FETCH_NEWS:
      return {
        ...state,
        newsData: true,
      };

    default:
      return state;
  }
};

export default reducer;
