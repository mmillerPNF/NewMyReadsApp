import React from 'react'
import Book from './Book';

const Bookshelf = props => {
    // look for this property name inside of the props object
    const { books, onUpdateShelf } = props;
    console.log(books);
    return (
        <div>
            <div className="bookshelf">
                <div className="bookshelf-books">
                    <div className="books-grid">
                        {books.map((b, index) => {
                            if (b.title) {
                                return (
                                    <div className='book' key={index}>
                                        <Book book={b} onUpdateShelf={onUpdateShelf}/>
                                    </div>
                                )
                            } else {
                                return <div>Empty shelf</div>
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookshelf;