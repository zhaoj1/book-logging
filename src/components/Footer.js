import React, { useEffect } from 'react'

import github from '../imgs/GitHub-Mark-32px.png'
import linkedin from '../imgs/linkedin.png'

function Footer() {

  return (
    <div className="footer">
      <div className='footer-left'>
        <label className='footer-text'>created by Justin Zhao</label>
      </div>
      <a href={'https://github.com/zhaoj1'} target='blank'>
        <img className='myLinks' src={github} />
      </a>
      <a href={'https://www.linkedin.com/in/justin-zh/'} target='blank'>
        <img className='myLinks' src={linkedin} height={32} />
      </a>
    </div>
  );
}

export default Footer;
