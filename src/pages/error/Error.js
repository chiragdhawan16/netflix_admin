import React from 'react'

import {Link} from 'react-router-dom'
import './Error.css'

const Error = () => {
  
  return (
  
        <section className='error-page-section'>
          <div>404</div>
          <p>Oops ! Page Not Found</p>
          <Link to="/">Go Back</Link>

        </section>
 
    
  )
}

export default Error