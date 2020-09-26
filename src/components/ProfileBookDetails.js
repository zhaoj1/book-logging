import React from 'react';

export default class ProfileBookDetails extends React.Component{

  render(){
    return(
      <div className='profile-book-details'>
        Rating: {
            this.props.bookDetails.averageRating == undefined ? 
              0
              :
              this.props.bookDetails.averageRating
          } ({
            this.props.bookDetails.ratingsCount == undefined ?
              0
              :
              this.props.bookDetails.ratingsCount
          } ratings)<br></br><br></br>
          Publisher: {
          this.props.bookDetails.publisher == undefined ?
            'N/A'
            :
            this.props.bookDetails.publisher
          }<br></br><br></br>
          Description:<br></br>{
            this.props.bookDetails.description == undefined ? 
              'N/A'
              :
              this.props.bookDetails.description
          }<br></br><br></br>
          Category: {
            this.props.bookDetails.categories == undefined ?
            'N/A'
            :
            this.props.bookDetails.categories.map(category => category).join(' ,')
          }<br></br>
          <a href={this.props.bookDetails.infoLink} target='blank'>Google Play Store</a><br></br><br></br>
      </div>
    )
  }
}