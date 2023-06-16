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
                        modalComponent={<LoginFormModal />}
                    />
                    <button className='demo-login' onClick={handleDemo}>TRY FOR FREE USER</button>
                    <button className='demo-login' onClick={handleAdmin}>TRY FOR FREE ADMIN</button>
                </div>
            </div>
            <div className='sign-up-splash'>
                <div>
                    <h1>Made for People</h1>
                    <h1>Made for Productivity</h1>
                    <p>Connect the right people, find anything you need and automate the rest. That’s work in Slack, your productivity platform.</p>
                    <OpenModalButton
                        buttonText='Sign Up'
                        modalComponent={<SignupFormModal />}
                    />
                </div>
                <img src={process.env.PUBLIC_URL + '/GibberishPlaceholderGif.gif'}></img>
            </div>
        </nav>
    )
}

export default SplashNav
