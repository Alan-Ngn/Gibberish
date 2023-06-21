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
                <div className='left-body-splash-gif'>
                    <img src='https://media.giphy.com/media/mZqbrGzNahVsSKG1Y9/giphy.gif'></img>
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
                <div className='body-splash-gif'>
                    <img src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2VxOWJscGoxbWd0OWJ5Z3ExM2Zwczc3ZnY2aXZqenBvbGtvd3hycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9OBQq0azsEbMQNakRO/giphy.gif'></img>
                </div>
            </div>
        </div>
    )
}
export default SplashBody
