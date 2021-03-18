import React from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
import {withBookstoreService} from '../hoc'
import {booksLoaded, booksRequested, booksError} from '../../actions'
import Spinner from '../spinner'
//import {bindActionCreators} from 'redux'
import './book-list.css'
import ErrorIndicator from "../error-indicator/error-indicator";

class BooklList extends React.Component {

    componentDidMount(){
       // 1) получение данных при монтировании объекта из сервиса (контекст!)
     
       const {bookStoreService, booksLoaded, booksRequested} = this.props;
       booksRequested()
        bookStoreService.getBooks()
       .then((data) => {this.props.booksLoaded(data)})
       .catch((err) => {this.props.booksError(err)})
       

       //2 dispatch action to store - для синхронного варианта:
      //  this.props.booksLoaded(data)
    }
  render() {
    const { books, loading, error } = this.props;

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
    return{books: state.books, loading: state.loading, error: state.booksError}
}//в наш компонент надо передать книги из редьюсера

const mapDispatchToProps = {booksLoaded, booksRequested, booksError}

//const mapDispatchToProps = (dispatch) => {
    //2 вариант: return bindActionCreators({booksLoaded}, dispatch)
//bAA возвращает объект со структурой, которая получается у mapDispatchToProps. 
//bAA обернет actionCreator'ы  так, что при вызове booksLoaded автоматически создает нужное действие и передает его в dispatch
    // 3 вариант: {booksLoaded: (newBooks) => {
    //         dispatch(booksLoaded(newBooks))}  }
  
//} 
export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BooklList));
//результат коннекта обернули в контекст - lesson 137
