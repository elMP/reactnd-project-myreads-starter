import React, { Component } from 'react'

class Book extends Component {
    shelfChanged = (event) => {
        this.props.updateShelf(this.props.book, event.target.value);
    }

    render() {
        let image = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : '';
        let authors = '';
        if (this.props.book.authors)
            this.props.book.authors.forEach( (author, index) => {
                authors += author;
                if (index < this.props.book.authors.length - 1)
                    authors += ', ';
            });
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, 
                        backgroundImage: `url(${image})`
                        }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={this.props.status} onChange={this.shelfChanged}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )}
}

export default Book;