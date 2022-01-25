import React from 'react';
import "./Footer.css"
const Footer = () => {
    return (
        
          <div className="footer navbar-fixed-bottom"style={{width:"100%",display: "inline-block"}}>
            <center >
            <hr/>
            <h3>&copy; Xomatoaps</h3>
                <div className="social">
                    <a href="www.facebook.com">
                        <img src="https://i.ibb.co/wyH9JxS/facebook.png" className="socialIcon" alt="Facebook"/>
                    </a>
                    <a href="www.instagram.com">
                        <img src="https://i.ibb.co/w0kZ5Hf/insta.png" className="socialIcon" alt="Instagram"/>
                    </a>
                </div>
            </center>
            </div>
    )
}
export default Footer;