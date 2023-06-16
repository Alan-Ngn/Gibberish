import { Link } from "react-router-dom";
import './SplashBody.css'

const SplashBody = () =>{
    return (
        <div className="splash-trusted-companies">
            <h2>TRUSTED BY COMPANIES ALL OVER THE WORLD</h2>
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

        </div>
    )
}
export default SplashBody
