import { useDispatch } from 'react-redux';
import './SplashNav.css'
import { Link } from "react-router-dom";
import { login } from '../../../store/session';
import OpenModalButton from '../../OpenModalButton';
import SignupFormModal from '../../SignupFormModal';
import LoginFormModal from '../../LoginFormModal';

const SplashNav = () => {
    const dispatch = useDispatch()

    const handleDemo = (e) => {
        e.preventDefault();
        dispatch(login('demo@aa.io', 'password'));
      }

      const handleAdmin = (e) => {
        e.preventDefault();
        dispatch(login('admin@aa.io', 'password'));
      }
    return (
        <nav className='splash-nav'>
            <div className='top-splash-nav-wrapper'>
                <div className='top-splash-nav'>
                    <div className='top-splash-nav-left'>
                        <img className='splash-icon' src='2758343-200.png'/>
                        <div>Gibberish</div>
                        {/* <div>Product</div>
                        <div>Resources</div> */}
                    </div>
                    <div className='top-splash-nav-right'>
                        <OpenModalButton
                            buttonText='Log In'
                            buttonClassName='log-in'
                            modalComponent={<LoginFormModal />}
                        />
                        <button className='demo-login' onClick={handleDemo}>DEMO USER</button>
                        {/* <button className='demo-login' onClick={handleAdmin}>DEMO ADMIN</button> */}
                    </div>
                </div>
                <div className='sign-up-splash'>
                    <div className='splash-text'>
                        <h1 className='first-title'>Made for friends.</h1>
                        <h1 className='second-title'>Built for connections.</h1>
                        <p>Connect with the right people. Connect with new people. Be productive or not.</p>
                        <OpenModalButton
                            buttonText='SIGN UP'
                            buttonClassName='sign-up'
                            modalComponent={<SignupFormModal />}
                        />
                        <p>Gibberish is free forever</p>
                    </div>

                    <div className='top-splash-gif'>
                        <img src='https://media.giphy.com/media/CALtIUyUQtpKtWX1iZ/giphy.gif'/>
                        {/* <img src={process.env.PUBLIC_URL + '/GibberishPlaceholderGif.gif'}></img> */}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SplashNav
