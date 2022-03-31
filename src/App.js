import React from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      searchBooks: []
    };
    this.updateShelf = this.updateShelf.bind(this);
  }

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

  searchForBooks = query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if(books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books })
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
    BooksAPI.getAll().then(b => {
      console.log(b);
      this.setState({
        books: b
      });
    });
  }

  resetSearch = () => {
    this.setState({
     searchBooks: []
    })
  }

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
                books={books}
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
