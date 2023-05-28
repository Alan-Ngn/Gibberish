
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '../SideNavigation/ProfileButton';
import './TopNavigation.css'

const TopNavigation = ({isLoaded}) => {
    // const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
    return (
        <nav className='top-nav'>
            {/* <div>
                <NavLink exact to="/">Home</NavLink>
            </div> */}
            {isLoaded && (
                <div>
                    <ProfileButton user={sessionUser} />
                </div>
            )}
        </nav>
    )
}

export default TopNavigation
