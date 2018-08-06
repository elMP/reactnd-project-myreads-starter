import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class SearchBook extends Component {
    state = {
        query: '',
        result: []
      }
    
    updateQuery = (query) => {
        this.setState({ query: query }, () => {
            if (this.state.query) {
              this.setSearchResult(this.state.query);
            } else {
              this.setState(state => ({ result: [] }));
            }
        });
    }

    setSearchResult = (query) => {
        //console.log("query", query);
        if (query) {
            //console.log(query);
            BooksAPI.search(query).then((result) => {
                if (result.error) {
                    this.setState(state => ({ result: [] }));
                  } else {
                    this.setState(state => ({ result: result }));
                  }
          })            
        }
        else
            this.setState(state => ({ result: [] }));
    }

    render() {
        //console.log("result:", this.state.result, this.state.query);
        let books;
        if (this.state.query)
            books = this.state.result;
        else
            books = [];

        return (
            <div className="search-books">
            <div className="search-books-bar">
                <Link className='close-search' to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input 
                        type="text"
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {books.map((book)  => (
                        <li key={book.id}>
                            <Book book={book} status="none"
                            />
                        </li>
                    ))}
                </ol>
            </div>
          </div>
        )
    }
}

export default SearchBook;