import React, {Fragment} from 'react'
import './bookilist-item.css'

const BookListItem = ({book}) => {
    const {author, title, price, coverImage} = book;

    return (
        <div className= 'book-list-item'>
            <div className='book-cover'>
                <img src={coverImage} alt='cover'/>
            </div>
            <div className='book-details'>
                <a href='#' className = 'book-title'>{title}</a>
                <div className='book-author'>{author}</div>
                <div className='book-price'>{price}</div>
            </div>
        </div>
    )
}//booklist-add css, booklist-item - add css
export default BookListItem