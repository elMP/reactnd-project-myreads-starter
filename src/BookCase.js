import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';

class BookCase extends Component {
    state = {
        shelves : [
            {title: "Currently Reading", status: "currentlyReading"},
            {title: "Want to Read", status: "wantToRead"},
            {title: "Read", status: "read"}
        ],
        booksOnShelves : []
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
                console.log(booksOnShelves);
                this.setState({booksOnShelves: booksOnShelves});
                console.log(booksOnShelves);
            });
    }

    render() {
        //console.log(this.props);
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.state.shelves.map((shelf)  => (
                            <BookShelf key={shelf.status} shelf={shelf}
                                books={this.state.booksOnShelves.filter(book => book.shelf === shelf.status)}
                                updateShelf = {this.updateShelf}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default BookCase;