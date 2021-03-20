import React from "react";
import BookListItem from "../book-list-item";
import {compose} from 'redux'
import { connect } from "react-redux";
import {withBookstoreService} from '../hoc'
import {booksLoaded, booksRequested, booksError} from '../../actions'
import Spinner from '../spinner'
//import {bindActionCreators} from 'redux'
import './book-list.css'
import ErrorIndicator from "../error-indicator";

class BooklList extends React.Component {

    componentDidMount(){
       // 1) получение данных при монтировании объекта из сервиса (контекст!)
     
       const {bookStoreService, booksLoaded, booksRequested, booksError} = this.props;
       booksRequested()
        bookStoreService.getBooks()
       .then((data) => {booksLoaded(data)})
       .catch((err) => {booksError(err)})
       

       //2 dispatch action to store - для синхронного варианта:
      //  this.props.booksLoaded(data)
    }
  render() {
    const { books, loading, error } = this.props;
    console.log(error)

    if (loading){return (<Spinner />)}
    if (error){return (<ErrorIndicator />)}

    return (
      <ul>
        {books.map((book) => {
          return (
            <li key={book.id}>
              <BookListItem book={book} />
            </li>
          );
        })}
      </ul>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state)
    return{books: state.books, loading: state.loading, error: state.error}
}//в наш компонент надо передать книги из редьюсера

const mapDispatchToProps = {booksLoaded, booksRequested, booksError}

//const mapDispatchToProps = (dispatch) => {
    //2 вариант: return bindActionCreators({booksLoaded}, dispatch)
//bAA возвращает объект со структурой, которая получается у mapDispatchToProps. 
//bAA обернет actionCreator'ы  так, что при вызове booksLoaded автоматически создает нужное действие и передает его в dispatch
    // 3 вариант: {booksLoaded: (newBooks) => {
    //         dispatch(booksLoaded(newBooks))}  }
  
//} 
export default compose(withBookstoreService(), connect(mapStateToProps, mapDispatchToProps))(BooklList);
//booklist сначала оборачивается в connect, затем- в withbookstoreservice
//компоненту буклист доступно все, что добавил коннект, а коннекту доступно то, что добавил ВБС

//export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BooklList));
//результат коннекта обернули в контекст - lesson 137
