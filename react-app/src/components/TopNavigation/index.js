
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '../SideNavigation/ProfileButton';
import './TopNavigation.css'

const TopNavigation = ({isLoaded}) => {
    // const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
    return (
        <nav className='top-nav'>
            <div>
                <NavLink exact to="/">Home</NavLink>
            </div>
     
                    <i class="fa-brands fa-linkedin" fa-10x>
                <Link className='linkedin' to={{pathname: `https://www.linkedin.com/in/alannguyen21`}} target='_blank'/>

                    </i>


                    <i class="fa-brands fa-github">
                <Link className='github' to={{pathname: `https://github.com/Alan-Ngn`}} target='_blank'/>

                    </i>

            {isLoaded && (
                <div>
                    <ProfileButton user={sessionUser} />
                </div>
            )}
        </nav>
    )
}

export default TopNavigation
