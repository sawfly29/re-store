import React, {Fragment} from 'react'
import './bookilist-item.css'

const BookListItem = ({book}) => {
    const {author, title} = book;

    return (
        <Fragment >

            <span>{author}</span>
            <span>{title}</span>


        </Fragment>
    )
}
export default BookListItem