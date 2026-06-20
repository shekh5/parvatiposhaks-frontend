import "../componentStyles/Footer.css"
import {Phone, Email, LinkedIn, GitHub, YouTube, Instagram} from "@mui/icons-material"

export function Footer(){
    return (<>
        <footer className="footer">
        <div className="footer-container">
            {/* 1st section */}
            <div className="footer-section contact">
                <h3>contact us</h3>
                <p><Phone fontSize="small"/>Phone: +91 6378162057</p>
                <p><Email fontSize="small"/>Email: info@parvatiphoshaks.com</p>
            </div>

            {/* 2nd section */}
            <div className="footer-section social">
                <h3>follow us</h3>
                <div className="social-links">
                    <a href="https://github.com/shekh5" target="_blank">
                        <GitHub className="social-icon"/>
                    </a>
                    <a href="https://www.linkedin.com/in/bhawani-singh-shekhawat7773/" target="_parent">
                        <LinkedIn className="social-icon"/>
                    </a>
                    <a href="https://www.youtube.com/channel/UCZVl6q42I5u75v94J8K5zQw" target="_top">
                        <YouTube className="social-icon"/>
                    </a>
                    <a href="https://www.instagram.com/parvatiposhaks/" target="_top">
                        <Instagram className="social-icon"/>
                    </a>
                </div>
            </div>

            <div className="footer-section about">
                <h3>About Us</h3>
                <p>Parvati Poshaks is a leading provider of high-quality products and services in the market.</p>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2026 Parvati Poshaks. All rights reserved.</p>
        </div>
        </footer>
    </>)
}