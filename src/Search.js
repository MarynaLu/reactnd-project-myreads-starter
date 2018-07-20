import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import CreateShelves from './CreateShelves'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Search extends React.Component {
	state = {
		query: '',
	}

	updateQuery = (query) => {
		this.setState({query: query.trim()})
		this.props.searchBooks(query)
	}

	render() {
		const { query } = this.state

		let showingSearchedBooks

		if (query){
			showingSearchedBooks = this.props.searchedBooks
		} else {
			showingSearchedBooks = this.props.allBooks
		}
 		
		return (
			<div>
				<div className="search-books-bar">
					<div className="close-search"></div>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search Books"
							value={this.state.query}
							onChange={(event) => this.updateQuery(event.target.value)}
						>
						</input>
					</div>
				</div>
				<div className="bookshelf-books">
	                    <ol className="books-grid">
	                      
	                      {showingSearchedBooks.map((book) => (
	                      		<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
												<div className="book-shelf-changer">
													<select>
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
		)
	}
}

export default Search