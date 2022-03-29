import React from "react";
import BookShelfChanger from "./BookShelfChanger";


const Book = props => {
    const { book, onUpdateShelf } = props;

    return (
        <div>
            <div className='book'>
                <div className="book-top">
                  <BookShelfChanger shelf={book.shelf} onUpdateShelf={onUpdateShelf} book={book}/>
                    <div className='book-cover' style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`,
                    }} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        </div>
    )
}

export default Book;