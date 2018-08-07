import React, { Component } from 'react'
import Book from './Book';

class BookShelf extends Component {
    updateShelf(book, shelf) {
        this.props.updateShelf(book, shelf);
    }

    render() {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map((book)  => (
                        <li key={book.id}>
                            <Book book={book} status={this.props.shelf.status}
                            updateShelf = {this.props.updateShelf}/>
                        </li>
                    ))}
                </ol>
            </div>
            </div>
        )
    }
}

export default BookShelf;