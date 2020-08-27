import React, { useEffect } from 'react'
import Contents from './components/Contents';
import Footer from './components/Footer';
import './App.css'

import Logo from './imgs/Logo v3.png'

function App() {

  return (
    <div className="App">
      <div className='logo' ><img src={Logo} /></div>
      <Contents />
      <Footer />
    </div>
  );
}

export default App;
