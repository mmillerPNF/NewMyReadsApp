import React from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import _ from "lodash";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      searchBooks: []
    };
    this.updateShelf = this.updateShelf.bind(this);
    this.getBooksInShelf = this.getBooksInShelf.bind(this);
  }

  // Returns a Promise which resolves to a JSON object containing a collection of book objects.
  // This collection represents the books currently in the bookshelves in your app.
  componentDidMount() {
    BooksAPI.getAll().then(b => {
      console.log(b);
      this.setState({
        books: b
      });
    });
  }

  async updateShelf(book, shelf) {
    let response = await BooksAPI.update(book, shelf);
    console.log(response);
    let allResponse = await BooksAPI.getAll().then(b => {
      console.log(b);
      this.setState({
        books: b
      });
      return b
    });
    console.log(allResponse);
  }

  getBooksInShelf = books => {
    let booksCount = {};
    for (let i = 0; i < books.length; i++) {
      booksCount[books[i].shelf] = (booksCount[books[i].shelf] || 0) + 1;
    }
    return booksCount;
  };

  

  // shouldComponentUpdate(nextProps, nextState) {
  //   let prevState = this.getBooksInShelf(this.state.books);
  //   BooksAPI.getAll().then(bk => {
  //     this.setState({
  //       books: bk
  //     });
  //     this.getBooksInShelf(bk);
  //   });
  //   if (_.isEqual(this.getBooksInShelf(nextState.books), prevState) && this.state.searchBooks.length <=0) {
  //     return false;
  //   }
  //   return true;
  // }

  searchForBooks = query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        this.setState({ searchBooks: books });
        console.log(this.state.searchBooks);
      });
    }
  };

  render() {
    const { books, searchBooks } = this.state;
    return (
      <div className="app">
        <Routes>
          <Route
            exact
            path={"/"}
            element={
              <HomePage books={books} onUpdateShelf={this.updateShelf} />
            }
          />
          <Route
            path={"/search"}
            element={
              <SearchPage
                searchBooks={searchBooks}
                searchForBooks={this.searchForBooks}
                onUpdateShelf={this.updateShelf}
                onResetSearch={this.resetSearch}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
