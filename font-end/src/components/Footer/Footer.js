import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faHome, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
function Footer() {
  return (
    <div className="site-footer">
        <div className="site-info">
          <div className="info-col first">
            <h2>About</h2>
            <hr/>
            <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <div className="follow-icon-list">
              <a href="https://www.facebook.com/Duccop112">
                <FontAwesomeIcon icon={faFacebook} className="soical-icon"/>
              </a>
              <a href="https://www.facebook.com/Duccop112">
                <FontAwesomeIcon icon={faTwitter} className="soical-icon"/>
              </a>
              <a href="https://www.facebook.com/Duccop112">
                <FontAwesomeIcon icon={faDiscord} className="soical-icon"/>
              </a>
              <a href="https://www.facebook.com/Duccop112">
                <FontAwesomeIcon icon={faGithub} className="soical-icon"/>
              </a>
            </div>
          </div>
          <div className="info-col middle">
            <h2>Contact</h2>
            <hr/>
            <p>
              <FontAwesomeIcon icon={faHome} className="contact-icon"/>
              {" "}New York, NY 10012, US
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon"/>
              {" "}info@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="contact-icon"/>
              {" "}+ 01 234 567 88
            </p>
          </div>
          <div className="info-col last">
            <h2>Legal{" & "}policies</h2>
            <hr/>
            <p>
              <a href='/'>Terms of usage</a>
            </p>
            <p>
              <a href='/'>Privacy policy</a>
            </p>
            <p>
              <a href='/'>Terms of usage</a>
            </p>
          </div>
        </div>
        <hr className='spilt'/>
        <div className="end-footer">© 2022 Adachi To Shimamura. All rights reserved</div>
    </div>
  )
}

export default Footer