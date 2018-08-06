import React, { Component } from 'react'
import Book from './Book';

class BookShelf extends Component {
    render() {
        //console.log(this.props);

        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map((book)  => (
                        <li key={book.id}>
                            <Book book={book} status={this.props.shelf.status}/>
                        </li>
                    ))}
                </ol>
            </div>
            </div>
        )
    }
}

export default BookShelf;