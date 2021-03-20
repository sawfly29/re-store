const booksLoaded = (newBooks) => {
  return { type: "BOOKS_LOADED", payload: newBooks };
};
const booksRequested = () => {
  return { type: "BOOKS_REQUESTED"};
};
const booksError = (err) => {
  return { type: "BOOKS_ERROR", payload: err};
};
export { booksLoaded, booksRequested, booksError };
