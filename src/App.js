import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookCase from './BookCase';
import SearchBook from './SearchBook';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    booksOnShelves : []
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksOnShelves) => {
        this.setState( {booksOnShelves} );
    })

  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
        .then(() => BooksAPI.getAll())
        .then((booksOnShelves) => {
            this.setState({booksOnShelves: booksOnShelves});
        });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div>
            <BookCase booksOnShelves = {this.state.booksOnShelves}
              updateShelf = {this.updateShelf}/>
            <div className="open-search">
              <Link to="/search" title="Add a Book">
                Add a book
              </Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBook booksInBookCase = {this.state.booksOnShelves}
            updateShelf = {this.updateShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp

