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
            <div className='top-splash-nav'>
                <div className='top-splash-nav-left'>
                    <div>Gibberish</div>
                    <div>Product</div>
                    <div>Resources</div>
                </div>
                <div className='top-splash-nav-right'>
                    <OpenModalButton
                        buttonText='Log In'
                        buttonClassName='log-in'
                        modalComponent={<LoginFormModal />}
                    />
                    <button className='demo-login' onClick={handleDemo}>DEMO USER</button>
                    <button className='demo-login' onClick={handleAdmin}>DEMO ADMIN</button>
                </div>
            </div>
            <div className='sign-up-splash'>
                <div className='splash-text'>
                    <h1 className='first-title'>Made for people.</h1>
                    <h1 className='second-title'>Built for productivity.</h1>
                    <p>Connect the right people, find anything you need and automate the rest. That’s work in Slack, your productivity platform.</p>
                    <OpenModalButton
                        buttonText='Sign Up'
                        buttonClassName='sign-up'
                        modalComponent={<SignupFormModal />}
                    />
                    <p>Slack is free to try for as long as you’d like</p>
                </div>
                <img src={process.env.PUBLIC_URL + '/GibberishPlaceholderGif.gif'}></img>
            </div>
        </nav>
    )
}

export default SplashNav
