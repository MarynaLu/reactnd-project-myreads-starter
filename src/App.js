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
      searchedBooks: []
    }


      componentDidMount() {
        BooksAPI.getAll().then(data => {
        this.setState({
        books: data
      });
    });
  }


    moveBook(book, newSection){
        
        if (this.state.books){
          BooksAPI.update(book, newSection).then(() => {
              book.shelf = newSection;
              this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }))
          })
        }

        console.log(this.state.books)

      }
  
    searchBooks(query){
       BooksAPI.search(query).then(data => {
          this.setState({
            searchedBooks: data
          });
       });
    }

   
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
              searchedBooks = {this.state.searchedBooks}
              searchBooks = {this.searchBooks}
              allBooks = {this.state.books}
             />
        )}/>

      </div>
    )
  }
}

export default BooksApp
