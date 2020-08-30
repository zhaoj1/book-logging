import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Modal from 'react-modal'

import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Results from './Results';
import BookDetails from './BookDetails';
import ProfileBookAnalytics from './ProfileBookAnalytics';
import Confirmation from './Confirmation';
import DeleteConfirm from './DeleteConfirm';

import background from '../imgs/background.png'

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
  results: [],
  modalIsOpen: false,
  modalType: null,
  selectedBook: {},
  booksList: null,
  pages: null,
  defaultSearch: '',
  defaultAuthor: '',
  loading: false,
}

export default class Contents extends React.Component{

  state = defState

  fetchBooks = async () => {
    const resp = await fetch('https://book-logging.herokuapp.com/books/', {headers: {Authorization: `JWT ${sessionStorage.getItem('token')}`}})
    const json = await resp.json()
    this.setState({booksList: {...json}})
  }

  fetchPages = async () => {
    const resp = await fetch('https://book-logging.herokuapp.com/pages/', {headers: {Authorization: `JWT ${sessionStorage.getItem('token')}`}})
    const json = await resp.json()
    this.setState({pages: {...json}})
    return resp
  }

  componentDidMount = () => {sessionStorage.clear()}

  setUser = (user) => {this.setState({currentUser: user, loggedIn: true})}

  setResults = (results) => {this.setState({results: results})}

  setDefaultSearch = (query) => {this.setState({defaultSearch: query})}

  setDefaultAuthor = (query) => {this.setState({defaultAuthor: query})}

  setSelectedBook = (book, page) => {
    this.setState({
      selectedBook: book,
      modalIsOpen: true,
      modalType: page
    })
  }

  confirmationPopup = (type) => {
    this.setState({
      modalIsOpen: true,
      modalType: type
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      modalType: null
    },() => this.setState({selectedBook: {}}))
  }

  toggleLoading = () => {this.setState({loading: !this.state.loading})}

  render(){
    return(
      <>
        <Router>
          <Switch>
            <Route exact path='/' render={(routerProps) => 
              <Landing 
                {...routerProps}
                setUser={this.setUser}
                toggleLoading={this.toggleLoading}
                loading={this.state.loading}
              />
            } />
            <Route exact path='/register' render={(routerProps) => 
              <div className='wrapper'>
                <Register 
                  {...routerProps}
                  setUser={this.setUser}
                  toggleLoading={this.toggleLoading}
                  loading={this.state.loading}
                />
              </div>
            } />
            <Route exact path='/login' render={(routerProps) => 
              <Login 
                {...routerProps}
                setUser={this.setUser}
                toggleLoading={this.toggleLoading}
                loading={this.state.loading}
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
                setDefaultSearch={this.setDefaultSearch}
                setDefaultAuthor={this.setDefaultAuthor}
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
                defaultSearch={this.state.defaultSearch}
                defaultAuthor={this.state.defaultAuthor}
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
              confirmationPopup={this.confirmationPopup}
            />
            :
            this.state.modalType == 'profile' ?
              <ProfileBookAnalytics
                selectedBook={this.state.selectedBook}
                currentUser={this.state.currentUser}
                fetchBooks={this.fetchBooks}
                closeModal={this.closeModal}
                pages={this.state.pages}
                fetchPages={this.fetchPages}
                fetchPages={this.fetchBooks}
                confirmationPopup={this.confirmationPopup}
              />
              :
              this.state.modalType == 'confirmation' ?
                <Confirmation 
                  closeModal={this.closeModal}
                />
                :
                this.state.modalType == 'delete' ? 
                  <DeleteConfirm 
                    selectedBook={this.state.selectedBook}
                    fetchBooks={this.fetchBooks}
                    closeModal={this.closeModal}
                    confirmationPopup={this.confirmationPopup}
                  />
                  :
                  null
          }
          
        </Modal>
        <div className='contents' style={{'background-image':`url(${background})`}}></div>
      </>
    )
  }
}