import {
    BOOK_ADDED_TO_CART,
    BOOK_DELETED_FROM_CART,
    BOOK_COUNT_DECREASED_IN_CART,
  } from "../actions/types";

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
    const {
      bookList: { books },
      shopingCart: { cartItems },
    } = state;
    const book = books.find((book) => {
      return book.id === bookId;
    });
    //индекс книги в тележке, далее - сама книга
    const itemIndex = cartItems.findIndex((book) => {
      return book.id === bookId;
    });
    const item = cartItems[itemIndex];
    const newItem = updateCartItem(book, item, quantity);
    if (newItem.count < 0) {
      return state.shopingCart;
    }
    const newCartItems = updateCartItems(cartItems, newItem, itemIndex);
  
    
  
    return {
      orderTotal: orderTotalCalc(newCartItems),
      cartItems: newCartItems
    };
  };

  const orderTotalCalc = (newCartItems) => {
  
    return newCartItems.reduce((sum, item) => {return sum + item.total}, 0)
  }
  
  
  const updateShopingCart = (state, action) => {
    if (state === undefined){return { cartItems: [], orderTotal: 0 }}
    switch (action.type) {
      case BOOK_DELETED_FROM_CART: {
        const bookId = action.payload;
        const bookIndex = state.shopingCart.cartItems.findIndex((book) => {
          return book.id === bookId;
        });
        const newCartItems = updateCartItems(state.shopingCart.cartItems, {}, bookIndex)
        
        return {       
          cartItems: newCartItems, 
          orderTotal: orderTotalCalc(newCartItems),
        };
      }
  
      case BOOK_ADDED_TO_CART:
        return updateOrder(state, action.payload, 1);
  
      case BOOK_COUNT_DECREASED_IN_CART:
        return updateOrder(state, action.payload, -1);
  
      default:
        return state.shopingCart;
    }
  };
  export default updateShopingCart