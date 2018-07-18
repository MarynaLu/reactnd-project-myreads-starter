import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import CreateShelves from './CreateShelves'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'



class BooksApp extends React.Component { 
   constructor(props){
        super(props);

        this.moveBook = this.moveBook.bind(this);
    }

  state = {
    /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      books: []
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
              console.log(newSection)
              book.shelf = newSection;
              this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }))
          })
        }

        console.log(this.state.books)

      }
  
   
  render(){
    return (
      <div>
        <CreateShelves 
          moveBook = {this.moveBook}
          searchPage = {this.state.showSearchPage}
          allBooks = {this.state.books}
        />
      </div>
    )
  }
}

export default BooksApp
