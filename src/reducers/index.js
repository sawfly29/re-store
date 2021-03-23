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
const updateCartItem = (book, item = {}) => {
  const { id = book.id, title = book.title, total = 0, count = 0 } = item;

  return {
    id,
    title,
    count: count + 1,
    total: total + book.price,
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

    case BOOK_ADDED_TO_CART: {
      const bookId = action.payload;
      const book = state.books.find((book) => {
        return book.id === bookId;
      });

      //индекс книги в тележке, далее - сама книга
      const itemIndex = state.cartItems.findIndex((book) => {
        return book.id === bookId;
      });
      const item = state.cartItems[itemIndex];

      const newItem = updateCartItem(book, item);

      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, itemIndex),
      };
    }

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
    case BOOK_COUNT_DECREASED_IN_CART: {
      const bookId = action.payload;
      const book = state.books.find((book) => {
        return book.id === bookId;
      });
      const bookIndex = state.cartItems.findIndex((book) => {
        return book.id === bookId;
      });
      const bookInCart = state.cartItems[bookIndex];
      const modifiedValues = {
        total: bookInCart.total - book.price - book.price,
        count: bookInCart.count - 2,
      };
      const modItem = updateCartItem(book, modifiedValues);
   if (modItem.count === -1){return state}
      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, modItem, bookIndex),
      };
    };
    

    default:
      return state;
  }
};

export default reducer;
