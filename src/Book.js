import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import Search from './Search'
//import sortBy from 'sort-by'

class Book extends Component {
	state = {
		shelf: ''
	}

	
	render () {
		
		const { moveBook, row } = this.props
		

		return (
			 /* Currently reading section*/
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{row}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      
                      {this.props.shelf.map((book) => (
                      		<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
											<div className="book-shelf-changer">
												<select value={this.props.selectValue} onChange={(event) => moveBook(book, event.target.value)}>
					                                <option value="move" disabled>Move to...</option>
					                                <option value="currentlyReading">Currently Reading</option>
					                                <option value="wantToRead">Want to Read</option>
					                                <option value="read">Read</option>
					                                <option value="none">None</option>
                              					</select>
											</div>
										</div>
										<div className="book-title">{book.title}</div>
										<div className="book-authors">{book.authors}</div>
									</div>
                      		</li>
						))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
		)
	}
}

Book.propTypes = {
  moveBook: PropTypes.func.isRequired,
  row: PropTypes.string.isRequired
}

export default Book