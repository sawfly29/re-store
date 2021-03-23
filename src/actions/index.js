import {
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_REQUEST,
  BOOK_ADDED_TO_CART,
  BOOK_DELETED_FROM_CART,
  BOOK_COUNT_DECREASED_IN_CART,
} from "./types";
const booksLoaded = (newBooks) => {
  return { type:   FETCH_BOOKS_SUCCESS,
    payload: newBooks };
};
const booksRequested = () => {
  return { type: FETCH_BOOKS_REQUEST };
};
const booksError = (err) => {
  return { type: FETCH_BOOKS_FAILURE, payload: err };
};

const fetchBooks = (bookStoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookStoreService
    .getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

const bookAddedToCart = (bookId) => {
  return {
    type: BOOK_ADDED_TO_CART,
    payload: bookId,
  };
};

const deleteItemFromCart = (itemId) => {
  return {
    type: BOOK_DELETED_FROM_CART,
    payload: itemId,
  };
};
const decreaseItemCountInCart = (itemId) => {
  return {
    type: BOOK_COUNT_DECREASED_IN_CART,
    payload: itemId,
  };
};

export {
  fetchBooks,
  bookAddedToCart,
  deleteItemFromCart,
  decreaseItemCountInCart,
};
