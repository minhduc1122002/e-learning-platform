import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons"

function Footer() {
  return (
    <div className="site-footer">
        <div className="site-info">
          <div className="about">
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet. Qui fugiat odio aut galisum assumenda qui odio autem eum omnis rerum et Quis dicta quo adipisci galisum earum possimus! Ab velit eveniet eos atque odit vel tempora fugit non earum officia cum ipsa dolorum eos velit nobis. Quo quam modi ad explicabo ducimus et reprehenderit deleniti id tempora odio. In quia est sunt fugiat ut maxime natus.</p>
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
          <img src="https://i.kym-cdn.com/photos/images/newsfeed/001/585/007/56a.jpg" alt=""/>
        </div>
    </div>
  )
}

export default Footer