import React from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
import {withBookstoreService} from '../hoc'
import {booksLoaded} from '../../actions'
import Spinner from '../spinner'
//import {bindActionCreators} from 'redux'
import './book-list.css'

class BooklList extends React.Component {

    componentDidMount(){
       // 1) получение данных при монтировании объекта из сервиса (контекст!)
       const {bookStoreService} = this.props;
        bookStoreService.getBooks()
       .then((data) => {this.props.booksLoaded(data)})
       

       //2 dispatch action to store - для синхронного варианта:
      //  this.props.booksLoaded(data)
    }
  render() {
    const { books, loading } = this.props;

    if (loading){return (<Spinner />)}

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
    return{books: state.books, loading: state.loading}
}//в наш компонент надо передать книги из редьюсера

const mapDispatchToProps = {booksLoaded}

//const mapDispatchToProps = (dispatch) => {
    //2 вариант: return bindActionCreators({booksLoaded}, dispatch)
//bAA возвращает объект со структурой, которая получается у mapDispatchToProps. 
//bAA обернет actionCreator'ы  так, что при вызове booksLoaded автоматически создает нужное действие и передает его в dispatch
    // 3 вариант: {booksLoaded: (newBooks) => {
    //         dispatch(booksLoaded(newBooks))}  }
  
//} 
export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BooklList));
//результат коннекта обернули в контекст - lesson 137
