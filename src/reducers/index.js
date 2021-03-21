const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 145,
};

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

      //проверим книгу в тележке, если есть - увеличим ее количество и вернем стейт
      const bookInCart=state.cartItems.find((bookInCart) => {return bookInCart.id === bookId})
  
      if (bookInCart){
        const count = bookInCart.count + 1;
        const totalPrice = book.price * count
        const addedItem = {
          id: bookInCart.id, 
          title: bookInCart.title,
          count,
          total: totalPrice,
        }

        let cartItemsCopy = [...state.cartItems];
        cartItemsCopy[state.cartItems.findIndex((book) => {return book.id === bookId})] = addedItem

        return { ...state, cartItems: cartItemsCopy };
      }
  else{
      const newItem = {
        id: book.id,
        title: book.title,
        count: 1,
        total: book.price,
      };
      
      return { ...state, cartItems: [...state.cartItems, newItem] }};

    default:
      return state;
  }
};

export default reducer;
