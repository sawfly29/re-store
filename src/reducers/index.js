const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 145,
};

//обновление единицы товара (книги) - 147 lesson
const updateCartItem = (book, item = {}) => {
  const {id = book.id, title = book.title, total = 0, count = 0} = item;

  return {
    id,
    title,
    count: count + 1,
    total: total + book.price
  }

}
//обновление списка товаров в корзине
const updateCartItems = (cartItems = {}, newItem, idx) => {
  if (idx === -1) {return [...cartItems, newItem]}
  else return [
    ...cartItems.slice(0, idx),
    newItem,
    ...cartItems.slice(idx+1)
]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_BOOKS_REQUEST":
      return {
        ...state,
        books: [],
        loading: true,
        error: null,
      };
    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload,
      };

    case "BOOK_ADDED_TO_CART":
      const bookId = action.payload;
      const book = state.books.find((book) => {return book.id === bookId});

      //индекс книги в тележке, далее - сама книга
      const itemIndex = state.cartItems.findIndex((book) => {return book.id === bookId})
      const  item = state.cartItems[itemIndex]

      const newItem = updateCartItem(book, item)

      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
      }
  


    default:
      return state;
  }
};

export default reducer;
