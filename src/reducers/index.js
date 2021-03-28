import {
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_REQUEST,
  BOOK_ADDED_TO_CART,
  BOOK_DELETED_FROM_CART,
  BOOK_COUNT_DECREASED_IN_CART,
} from "../actions/types";
const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 145,
};

//обновление единицы товара (книги) - 147 lesson
const updateCartItem = (book, item = {}, quantity) => {
  const { id = book.id, title = book.title, total = 0, count = 0 } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + book.price * quantity,
  };
};
//обновление списка товаров в корзине
const updateCartItems = (cartItems = {}, newItem, idx) => {
  if (idx === -1) {
    return [...cartItems, newItem];
  } else if (Object.keys(newItem).length === 0) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  } else
    return [...cartItems.slice(0, idx), newItem, ...cartItems.slice(idx + 1)];
};

//обновление общей очереди
const updateOrder = (state, bookId, quantity) => {
  const { books, cartItems } = state
  const book = books.find((book) => {
    return book.id === bookId;
  });
  //индекс книги в тележке, далее - сама книга
  const itemIndex = cartItems.findIndex((book) => {
    return book.id === bookId;
  });
  const item = cartItems[itemIndex];
  const newItem = updateCartItem(book, item, quantity);
  if (newItem.count < 0) { return state }

  return {
    ...state,
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
  };

}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        books: [],
        loading: true,
        error: null,
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload,
      };
    case BOOK_DELETED_FROM_CART: {
      const bookId = action.payload;
      const bookIndex = state.cartItems.findIndex((book) => {
        return book.id === bookId;
      });
      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, {}, bookIndex),
      };
    }



    case BOOK_ADDED_TO_CART: 
      return updateOrder(state, action.payload, 1)

    

    case BOOK_COUNT_DECREASED_IN_CART: 
      return updateOrder(state, action.payload, -1)
    ;


    default:
      return state;
  }
};

export default reducer;
