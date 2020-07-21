import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Modal from 'react-modal'

import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Results from './Results';
import BookDetails from './BookDetails';
import ProfileBookDetails from './ProfileBookDetails';

const modalStyle = {
  overlay : {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '65%',
    height: '80%',
  }
}

Modal.setAppElement('#root');

const defState = {
  currentUser: null,
  loggedIn: false,
  results: {},
  modalIsOpen: false,
  modalType: null,
  selectedBook: {},
  booksList: null,
  pages: null
}

export default class Contents extends React.Component{

  state = defState

  fetchBooks= () => {
    fetch('http://127.0.0.1:8000/books/', {headers: {Authorization: `JWT ${sessionStorage.getItem('token')}`}})
    .then(data => data.json())
    .then(resp => {this.setState({booksList: {...resp}})})
  }

  fetchPages= () => {
    fetch('http://127.0.0.1:8000/pages/', {headers: {Authorization: `JWT ${sessionStorage.getItem('token')}`}})
    .then(data => data.json())
    .then(resp => {this.setState({pages: {...resp}})})
  }

  componentDidMount = () => {sessionStorage.clear()}

  setUser = (user) => {
    this.setState({currentUser: user, loggedIn: true})
  }

  setResults = (results) => {
    this.setState({results: results})
  }

  setSelectedBook = (book, page) => {
    this.setState({
      selectedBook: book,
      modalIsOpen: true,
      modalType: page
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      modalType: null
    },() => this.setState({selectedBook: {}}))
  }

  render(){
    return(
      <>
        <Router>
          <Switch>
            <Route exact path='/' render={(routerProps) => 
              <Landing 
                {...routerProps}
              />
            } />
            <Route exact path='/register' render={(routerProps) => 
              <Register 
                {...routerProps}
                setUser={this.setUser}
              />
            } />
            <Route exact path='/login' render={(routerProps) => 
              <Login 
                {...routerProps}
                setUser={this.setUser}
              />
            } />
            <Route exact path='/profile' render={(routerProps) => 
              <Profile
                {...routerProps}
                currentUser={this.state.currentUser}
                loggedIn={this.state.loggedIn}
                booksList={this.state.booksList}
                modalIsOpen={this.state.modalIsOpen}
                setResults={this.setResults}
                setSelectedBook={this.setSelectedBook}
                fetchBooks={this.fetchBooks}
                pages={this.state.pages}
                fetchPages={this.fetchPages}
              />
            } />
            <Route exact path='/results' render={(routerProps) => 
              <Results
                {...routerProps}
                currentUser={this.state.currentUser}
                loggedIn={this.state.loggedIn}
                setResults={this.setResults}
                results={this.state.results}
                setSelectedBook={this.setSelectedBook}
                fetchBooks={this.fetchBooks}
              />
            } />
          </Switch>
        </Router>
        <Modal
           isOpen={this.state.modalIsOpen}
           onRequestClose={this.closeModal}
           style={modalStyle}
        >
          {this.state.modalType == 'details' ?
            <BookDetails
              selectedBook={this.state.selectedBook}
              currentUser={this.state.currentUser}
              fetchBooks={this.fetchBooks}
              closeModal={this.closeModal}
            />
            :
            this.state.modalType == 'profile' ?
              <ProfileBookDetails
                selectedBook={this.state.selectedBook}
                currentUser={this.state.currentUser}
                fetchBooks={this.fetchBooks}
                closeModal={this.closeModal}
                pages={this.state.pages}
                fetchPages={this.fetchPages}
              />
              :
              null
          }
          
        </Modal>
      </>
    )
  }
}