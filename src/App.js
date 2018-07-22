import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import CreateShelves from './CreateShelves'
import { Route } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import './App.css'



class BooksApp extends React.Component { 
   constructor(props){
        super(props);

        this.moveBook = this.moveBook.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
    }

  state = {
      books: [],
      searchedBooks: [],
      allowedQueries: ['Android', 'Swimming', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    }


      componentDidMount() {
        BooksAPI.getAll().then(data => {
        this.setState({
        books: data
      });
    });
  }

  searchBooks(query){
    if(this.state.allowedQueries.indexOf(query) > 1) {
            BooksAPI.search(query).then(data => {
                 if(data.length){
                     data.forEach((book, index) => {
                     let myBook = this.state.books.find((b) => b.id === book.id);
                      book.shelf = myBook ? myBook.shelf : 'none';
                      data[index] = book;
                  });

                  this.setState({
                    searchedBooks: data
                  });
                }

              });

            } else {

            this.setState({
                searchedBooks: []
            });
          }
        };

    moveBook(book, newSection){
        
        if (this.state.books){
          BooksAPI.update(book, newSection).then(() => {
              book.shelf = newSection;
              this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }))
          })
        }
        }
      
   /* addShelves() {
      this.state.searchedBooks.forEach(function(book, index){
        if(this.state.books.indexOf(book) > 0){
          this.setState(state => ({
            books: 
          }))

          this.state.searchedBooks[index].shelf = this.state.books.find(book).shelf
        }
      })
    }*/
   
  render(){
    return (
      <div>

        <Route path="/" exact render={() => (
            <CreateShelves 
              moveBook = {this.moveBook}
              allBooks = {this.state.books}
            />
        )}/>
        

        <Route path="/search" exact render={() => (
            <Search 
              allBooks = {this.state.books}
              moveBook = {this.moveBook}
              searchBooks = {this.searchBooks}
              searchedBooks = {this.state.searchedBooks}
              /*update = {this.updateSearchShelf}*/
             />
        )}/>

      </div>
    )
  }
}

export default BooksApp
