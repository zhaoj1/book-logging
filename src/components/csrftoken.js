import React from 'react';
import Cookies from 'js-cookie';

const cookies = Cookies.get()

// function getCookie(name) {
//   var cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//     var cookies = document.cookie.split(';');
//     for (var i = 0; i < cookies.length; i++) {
//       var cookie = cookies[i].trim();
//       if (cookie.substring(0, name.length + 1) === (name + '=')) {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

// var csrftoken = getCookie('csrftoken');

const CSRFToken = () => {
  return (
      <input type="hidden" name="csrfmiddlewaretoken" value={cookies.csrftoken} />
  );
};

export default CSRFToken;