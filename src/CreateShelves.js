import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'
import Book from './Book'
import Search from './Search'
//import sortBy from 'sort-by'

class CreateShelves extends Component {
	state = {
		shelf: ''
	}



  	render() {
  		 const { moveBook } = this.props

    return (
      <div className="app">
        {this.props.searchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
			
		<Book 
			shelf = {this.props.allBooks.filter(book => book.shelf === "currentlyReading")}
			moveBook={moveBook}
			row = "Currently Reading"
			selectValue = "currentlyReading"
		/>	
         
        <Book
        	shelf={this.props.allBooks.filter(book => book.shelf === "wantToRead")}
        	moveBook={moveBook}
        	row = "Want To Read"
        	selectValue = "wantToRead"
        />

        <Book
        	shelf={this.props.allBooks.filter(book => book.shelf === "read")}
        	moveBook={moveBook}
        	row = "Read"
        	selectValue = "read"
        />
		

          {/*Open search section*/}
            <div className="open-search">
              <Link
              	to="/search">Add a book
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

CreateShelves.propTypes = {
  moveBook: PropTypes.func.isRequired
}

export default CreateShelves