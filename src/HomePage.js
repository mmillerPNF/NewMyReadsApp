import React from 'react'
import Bookshelf from './Bookshelf'

import OpenSearchButton from './OpenSearchPage';


const HomePage = props => {
  // constructor(props){
  //   super(props);
  // }
  const { books, onUpdateShelf } = props;
  const currentlyReadingBooks = books && (books.filter(book => book.shelf === 'currentlyReading'));
  const wantToReadBooks = books && (books.filter(book => book.shelf === 'wantToRead'));
  const haveReadBooks = books && (books.filter(book => book.shelf === 'read'));

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Currently Reading</h2>
          <Bookshelf books={currentlyReadingBooks} onUpdateShelf={onUpdateShelf}/>
        </div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Want To Read</h2>
          <Bookshelf books={wantToReadBooks} onUpdateShelf={onUpdateShelf}/>
        </div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Have Read</h2>
          <Bookshelf books={haveReadBooks} onUpdateShelf={onUpdateShelf}/>
        </div>
      </div>
      <OpenSearchButton />
    </div>
  )
}


export default HomePage;