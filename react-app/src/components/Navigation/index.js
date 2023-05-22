import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import CreateChannelModal from '../CreateChannel';
import { loadUsersThunk } from '../../store/user';
import ChannelDropdown from '../ChannelMenu';

function Navigation({ isLoaded }){
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);


	const onButtonClick = (e) =>{
		dispatch(loadUsersThunk())
	}

	return (
		<nav className='main-nav'>
			<div>
				<NavLink exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
			{isLoaded && sessionUser && (
				<nav className='side-nav'>
					<div>Channels</div>
					{sessionUser.channels && sessionUser.channels.map((channel)=>(
						<div className='channel-nav'>
							<NavLink to={`/channels/${channel.id}`}>{channel.title}</NavLink>
							{sessionUser.id === channel.admin_id && (
								<ChannelDropdown id={channel.id} members={channel.members} channelTitle={channel.title}/>
							)}
						</div>

					))}
					{sessionUser.admin && (
						<OpenModalButton
							buttonText='Add channels'
							onButtonClick={onButtonClick}
							modalComponent={<CreateChannelModal adminId={sessionUser.id} members={[sessionUser]} channelTitle={''} type={'create'}/>}
						/>
					)}
				</nav>
			)}
		</nav>
	);
}

export default Navigation;
