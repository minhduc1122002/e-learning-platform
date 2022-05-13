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
            <p>Trường Đại học Công nghệ là một trường đại học thành viên của Đại học Quốc gia Hà Nội, được thành lập vào năm 2004, địa chỉ tại 144 Xuân Thủy, quận Cầu Giấy, Hà Nội.</p>
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
              {" "}E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon"/>
              {" "}uet@vnu.edu.vn
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="contact-icon"/>
              {" "}024.37547.461
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
        <div className="end-footer">© Trường Đại học Công nghệ, Đại học Quốc Gia Hà Nội</div>
    </div>
  )
}

export default Footer