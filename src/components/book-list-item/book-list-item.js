import React from 'react'
import './book-list-item.css'

const BookListItem = ({book, onAddedToCart}) => {
    const {author, title, price, coverImage} = book;

    return (
        <div className= 'book-list-item'>
            <div className='book-cover'>
                <img src={coverImage} alt='cover'/>
            </div>
            <div className='book-details'>
                <span className = 'book-title'>{title}</span>
                <div className='book-author'>{author}</div>
                <div className='book-price'>{price}</div>
            <button className='btn btn-primary' onClick={onAddedToCart}>Add to cart</button>
            </div>
        </div>
    )
}//booklist-add css, booklist-item - add css
export default BookListItem