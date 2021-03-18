const booksLoaded = (newBooks) => {
  return { type: "BOOKS_LOADED", payload: newBooks };
};
const booksRequested = () => {
  return { type: "BOOKS_REQUESTED"};
};
const booksError = () => {
  return { type: "BOOKS_ERROR"};
};
export { booksLoaded, booksRequested, booksError };
