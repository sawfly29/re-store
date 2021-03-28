import updateShopingCart from './shoping-cart'
import updateBookList from './book-list'


//import bookList from "../components/book-list/book-list";


const reducer = (state, action) => {
  return{
    bookList: updateBookList(state, action), 
    shopingCart: updateShopingCart(state, action)
  }
};

export default reducer;
//урок 149 - перепилили редьюсер
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_BOOKS_FAILURE:
//     case FETCH_BOOKS_SUCCESS:
//     case FETCH_BOOKS_REQUEST:
//       return { ...state, bookList: updateBookList(state, action) };
//     case BOOK_ADDED_TO_CART:
//     case BOOK_DELETED_FROM_CART:
//     case BOOK_COUNT_DECREASED_IN_CART:
//       return { ...state, shopingCart: updateShopingCart(state, action) };
//     default:
//       return state;
//   }
// };
// return{
//   shopingCart: updateShopingCart,
//   bookList: updateBookList
// }}

