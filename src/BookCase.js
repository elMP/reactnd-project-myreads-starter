import React, { Component } from 'react'
import BookShelf from './BookShelf';

class BookCase extends Component {
    state = {
        shelves : [
            {title: "Currently Reading", status: "currentlyReading"},
            {title: "Want to Read", status: "wantToRead"},
            {title: "Read", status: "read"}
        ]
    }

    updateShelf(book, shelf) {
        //console.log(book, shelf);
        this.props.updateShelf(book, shelf);
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
                                books={this.props.booksOnShelves.filter(book => book.shelf === shelf.status)}
                                updateShelf = {this.props.updateShelf}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default BookCase;