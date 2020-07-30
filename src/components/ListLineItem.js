import React from 'react';
import moment from 'moment';

function ListLineItem(props){

  return(
    <label>
      [{moment(props.data.x).format('MM/DD/YYYY')}] {props.data.y} page(s)
    </label>
  )
}

export default ListLineItem