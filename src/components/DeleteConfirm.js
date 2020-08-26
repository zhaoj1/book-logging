import React from 'react';

export default class DeleteConfirm extends React.Component{

  deleteBook = async () => {
    const bookDeleted = await fetch(`https://book-logging.herokuapp.com/books/${this.props.selectedBook.id}`, {
      method: 'DELETE',
      headers: {'Authorization': `JWT ${sessionStorage.getItem('token')}`}
    })
    if(bookDeleted){
      this.props.closeModal();
      this.props.fetchBooks();
    }
  }

  render(){
    return(
      <div className='wrapper'>
        <div className='confirmation'>
          <h1>Are you sure?</h1>
          <button className='details-btn' onClick={this.deleteBook}>Yes</button><br></br>
          <button className='details-btn' onClick={() => this.props.confirmationPopup('profile')}>No</button>
        </div>
      </div>
    )
  }
}