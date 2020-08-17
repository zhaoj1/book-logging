import React from 'react';
import { Redirect } from "react-router-dom";
import BookCard from './BookCard';
import Search from './Search';

export default class Results extends React.Component{

  state = {
    resultsBegin: 0,
    resultsEnd: 10,
    shownResults: [],
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.setState({
      shownResults: this.props.results.items.slice(this.state.resultsBegin, this.state.resultsEnd)
    })
  }

  componentDidUpdate = (prevProps) => {
    if(this.props !== prevProps){
      this.setState({
        resultsBegin: 0,
        resultsEnd: 10
      }, () => this.updateResults())
    }
  }

  updateResults = () => {
    this.setState({
      shownResults: this.props.results.items.slice(this.state.resultsBegin, this.state.resultsEnd)
    })
  }

  backToProfile = () => {
    this.setState({
      resultsBegin: 0,
      resultsEnd: 10,
      shownResults: []
    })
    this.props.history.push('/profile')
  }

  nextBtn = () => {
    this.setState({
      resultsBegin: this.state.resultsBegin + 10,
      resultsEnd: this.state.resultsEnd + 10,
    }, () => this.updateResults())
  }

  prevBtn = () => {
    this.setState({
      resultsBegin: this.state.resultsBegin - 10,
      resultsEnd: this.state.resultsEnd - 10,
    }, () => this.updateResults())
  }

  render(){
    return(
      <div className='results-page'>
        <div className='search-box'>
          {console.log(this.props.results)}
          <Search 
            setResults={this.props.setResults}
          />
        </div>
        {this.props.loggedIn ? 
          <div className='results-container'>
            <button 
              className='results-btn'
              onClick={this.prevBtn}
              disabled={
                this.state.resultsBegin == 0 ?
                  true
                  :
                  false
              }
            >&lt;</button>
            <div className='results'>
              {this.state.shownResults.map(ele => 
                <BookCard 
                  ele={ele} 
                  setSelectedBook={this.props.setSelectedBook}
                />
              )}
            </div>
            <button
              className='results-btn'
              onClick={this.nextBtn}
              disabled={
                this.state.resultsEnd >= this.props.results.items.length ?
                  true
                  :
                  false
              }
            >&gt;</button>
          </div>
          :
          <Redirect to='/' />
        }
        <button onClick={this.backToProfile} className='back-btn'>Back</button>
      </div>
    )
  }
}