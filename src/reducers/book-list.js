import {
    FETCH_BOOKS_FAILURE,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_REQUEST,
  } from "../actions/types";
  

//обновление единицы товара (книги) - 147 lesson
  
  //при неопределенном стейте возвращаем кусок, который раньше входил в initialstate- см.149
const updateBookList = (state, action) => {
    if (state === undefined){return {
        books: [], loading: true, error: null
    }}
    switch (action.type) {
      case FETCH_BOOKS_SUCCESS:
        return {
          books: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_BOOKS_REQUEST:
        return {
          books: [],
          loading: true,
          error: null,
        };
      case FETCH_BOOKS_FAILURE:
        return {
          books: [],
          loading: false,
          error: action.payload,
        };
      default:
        return state.bookList;
    }
  };
  export default updateBookList