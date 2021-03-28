import React from "react";
import BookListItem from "../book-list-item";
import { compose } from "redux";
import { connect } from "react-redux";
import { withBookstoreService } from "../hoc";
import { fetchBooks, bookAddedToCart } from "../../actions";
import Spinner from "../spinner";
import { bindActionCreators } from "redux";
import "./book-list.css";
import ErrorIndicator from "../error-indicator";

//рекомендуется разделить компонент на часть для оборачивания (контейнер, отвечает за логику)
//и часть для визуального отображения (BLContainer и BL соответственно)
const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul>
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddedToCart={() => onAddedToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

class BooklListContainer extends React.Component {
  componentDidMount() {
    this.props.fetchBooks(); //функция с урока 142, она находится в mapDispatchToProps, в 143 перенесена в actions

    // 1) получение данных при монтировании объекта из сервиса (контекст!)
    //  const {bookStoreService, booksLoaded, booksRequested, booksError} = this.props;
    //  booksRequested()
    //   bookStoreService.getBooks()
    //  .then((data) => {booksLoaded(data)})
    //  .catch((err) => {booksError(err)})

    //2 dispatch action to store - для синхронного варианта:
    //  this.props.booksLoaded(data)
  }
  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookList.books,
    loading: state.bookList.loading,
    error: state.bookList.error,
  };
}; //в наш компонент надо передать книги из редьюсера

//const mapDispatchToProps = {booksLoaded, booksRequested, booksError} - lesson 142
const mapDispatchToProps = (dispatch, { bookStoreService }) => {
  //const { bookStoreService } = ownProps; в ходе рефакторинга деструктурировали из ownprops bSS

  // bindAC сразу вызывает диспатч для переданноых в него экшнов
  return bindActionCreators(
    {
      fetchBooks: fetchBooks(bookStoreService),
      onAddedToCart: bookAddedToCart,
    },
    dispatch
  );
};

//const mapDispatchToProps = (dispatch) => {
//2 вариант: return bindActionCreators({booksLoaded}, dispatch)
//bAA возвращает объект со структурой, которая получается у mapDispatchToProps.
//bAA обернет actionCreator'ы  так, что при вызове booksLoaded автоматически создает нужное действие и передает его в dispatch
// 3 вариант: {booksLoaded: (newBooks) => {
//         dispatch(booksLoaded(newBooks))}  }

//}
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BooklListContainer);
//booklist сначала оборачивается в connect, затем- в withbookstoreservice
//компоненту буклист доступно все, что добавил коннект, а коннекту доступно то, что добавил ВБС

//export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BooklList));
//результат коннекта обернули в контекст - lesson 137
