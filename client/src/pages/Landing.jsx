import React from 'react'
import Wrapper from "../assets/wrappers/LandingPage" // css wrapper
import main from "../assets/images/main.svg"
import logo from "../assets/images/logo.svg"
import {Link} from "react-router-dom";


const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="Jobify" className='logo'/>
      </nav>
      <div className='container page'>
        <div className="info">
          <h1>
            job <span>Tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad sapiente facilis temporibus excepturi, a doloremque ratione maxime nesciunt et velit consectetur repudiandae nisi rem sunt sed officiis eligendi iure eius!
          </p>
          <Link to="/register" className="btn register-link">Register</Link>
          <Link to="/login" className="btn">Login/Demo User</Link>
        </div>    
        <img src={main} alt="job hunt" className='img main-img'/>    
      </div>
    </Wrapper>
  )
}


export default Landing