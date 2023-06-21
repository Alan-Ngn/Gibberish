import { Link } from "react-router-dom";
import './SplashBody.css'

const SplashBody = () =>{
    return (
        <div className="splash-trusted-companies">
            <h4 className="splash-body-title">TRUSTED BY COMPANIES ALL OVER THE WORLD</h4>
            <div className="splash-companies">
                <a href='https://mango-music-4c4k.onrender.com' target="_blank">
                    <img className='company-image' src={process.env.PUBLIC_URL + '/MangoMusic.png'}></img>
                    <h3>Mango Music</h3>
                </a>

                <a href="https://airbnb-solo-aa-project.onrender.com" target="_blank">

                    <img className='company-image' src={process.env.PUBLIC_URL + '/dirtbnb.png'}></img>
                    <h3>EarthBnb</h3>
                </a>
            </div>
            <div className="splash-body-content">
                <div className='top-splash-gif'>
                    <img src={process.env.PUBLIC_URL + '/GibberishPlaceholderGif.gif'}></img>
                </div>
                <div className="splash-body-content-text">
                    <h2>
                        Bring your team together
                    </h2>
                    <p>At the heart of Slack are channels: organized spaces for everyone and everything you need for work. In channels, it’s easier to connect across departments, offices, time zones and even other companies.</p>
                </div>
            </div>
            <div className="splash-body-content">

                <div className="splash-body-content-text">
                    <h2>
                        Bring your team together
                    </h2>
                    <p>At the heart of Slack are channels: organized spaces for everyone and everything you need for work. In channels, it’s easier to connect across departments, offices, time zones and even other companies.</p>
                </div>
                <div className='top-splash-gif'>
                    <img src={process.env.PUBLIC_URL + '/GibberishPlaceholderGif.gif'}></img>
                </div>
            </div>
        </div>
    )
}
export default SplashBody
