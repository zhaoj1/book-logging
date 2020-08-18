import React from 'react';

export default class ProfileBookDetails extends React.Component{

  state = {
    avgRating: 0,
    ratingsCount: 0,
    publisher: '',
    description: '',
    categories: [],
    infoLink: ''
  }

  searchBook = async () => {
    const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.props.selectedBook.api_id}&key=` + process.env.REACT_APP_GOOGLE_BOOKS_API_KEY)
    const json = await resp.json()
    console.log(json)

    this.setState({
      avgRating: json.items[0].volumeInfo.averageRating,
      ratingsCount: json.items[0].volumeInfo.ratingsCount,
      publisher: json.items[0].volumeInfo.publisher,
      description: json.items[0].volumeInfo.description,
      categories: json.items[0].volumeInfo.categories,
      infoLink: json.items[0].volumeInfo.infoLink
    })
  }

  componentDidMount(){
    this.searchBook()
  }

  render(){
    return(
      <div className='profile-book-details'>
        Rating: {
            this.state.avgRating == undefined ? 
              0
              :
              this.state.avgRating
          } ({
            this.state.ratingsCount == undefined ?
              0
              :
              this.state.ratingsCount
          } ratings)<br></br><br></br>
          Publisher: {
          this.state.publisher == undefined ?
            'N/A'
            :
            this.state.publisher
          }<br></br><br></br>
          Description:<br></br>{
            this.state.description == undefined ? 
              'N/A'
              :
              this.state.description
          }<br></br><br></br>
          Category: {
            this.state.categories == undefined ?
            'N/A'
            :
            this.state.categories.map(category => category).join(' ,')
          }<br></br>
          <a href={this.state.infoLink} target='blank'>Google Play Store</a><br></br><br></br>
      </div>
    )
  }
}