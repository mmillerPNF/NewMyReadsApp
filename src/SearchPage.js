import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class SearchPage extends Component {
  constructor() {
    super();
    this.state = { inputValue: "" };
  }
  handleChange = event => {
    const val = event.target.value;
    this.setState({ inputValue: val }, () => {
      this.props.searchForBooks(val);
    });
  };

  render() {
    const { books, searchBooks, onResetSearch, onUpdateShelf } = this.props;
    const updatedSearchBooks = searchBooks.map(bk => {
      books.map(b => {
        if(b.id === bk.id) {
          bk.shelf = b.shelf;
        }
        return b;
      });
      return bk;
    })
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={onResetSearch}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              value={this.state.inputValue}
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {updatedSearchBooks.map(b => (
              <Book key={b.id} book={b} shelf={b.shelf ? b.shelf : 'none'} onUpdateShelf={onUpdateShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
