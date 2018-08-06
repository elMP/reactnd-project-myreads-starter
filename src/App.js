import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookCase from './BookCase';
import SearchBook from './SearchBook';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    booksOnShelves : [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksOnShelves) => {
        //console.log(booksOnShelves);
        this.setState( {booksOnShelves} );
      //console.log("state" + this.state.booksOnShelves.length);
    })

  }

  updateShelf = (book, shelf) => {
    //console.log(book, shelf);
    BooksAPI.update(book, shelf)
        .then(() => BooksAPI.getAll())
        .then((booksOnShelves) => {
            //console.log(booksOnShelves);
            this.setState({booksOnShelves: booksOnShelves});
            //console.log(booksOnShelves);
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
          <SearchBook updateShelf = {this.updateShelf}/>
        )}/>
      </div>

/*       <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook />
        ) : (
          <BookCase />
        )}
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
      </div> */
    )
  }
}

export default BooksApp

