import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import CreateShelves from './CreateShelves'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Search extends React.Component {
	state = {
		query: '',
		searchedBooks: [],
		allowedQueries: ['Android', 'Swimming', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
	}

	updateQuery = (query) => {
		this.setState({query: query})
		this.searchBooks(query)
	}

	 searchBooks(query){
	 	if(this.state.allowedQueries.indexOf(query) > 1) {
	       BooksAPI.search(query).then(data => {
	          this.setState({
	            searchedBooks: data
	          });
	       });
	    } else {
	    	this.setState({
	    		searchedBooks: []
	    	})
	    }
    }



	render() {
		const { moveBook } = this.props
		const { query } = this.state
		

		let showingSearchedBooks

		if (query){
			showingSearchedBooks = this.state.searchedBooks
		} else {
			showingSearchedBooks = []
		}
 		
		return (
			<div>
				<div className="search-books-bar">
					<Link className="close-search" to="/"></Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search Books"
							value={this.state.query}
							onChange={(event) => this.updateQuery(event.target.value)}
						>
						</input>
					</div>
				</div>
					 <div className="list-books-content-search">
					 	<div>
							<div className="bookshelf">
								<div className="bookshelf-books">
					                    <ol className="books-grid">
					                      
					                      {showingSearchedBooks.map((book) => (
					                      		<li key={book.id}>
													<div className="book">
														<div className="book-top">
															<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
																<div className="book-shelf-changer">
																	<select value="none" onChange={(event) => moveBook(book, event.target.value)}>
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
			</div>
		)
	}
}

export default Search