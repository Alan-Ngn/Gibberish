import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import CreateChannelModal from '../CreateChannel';
import { loadUsersThunk } from '../../store/user';
import DeleteChannelModal from '../DeleteChannel';
import KebabModal from '../KebabMenu';

function Navigation({ isLoaded }){
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);

	const addChannel = (e) => {

	}

	const onButtonClick = (e) =>{
		dispatch(loadUsersThunk())
	}

	return (
		<div>
			<div>
				<NavLink exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
			{isLoaded && sessionUser && (
				<nav className='channel-nav'>
					{sessionUser.channels && sessionUser.channels.map((channel)=>(
						<div>
							<NavLink to={`/channels/${channel.id}`}>{channel.title}</NavLink>
							<OpenModalButton
							 buttonText='Edit/Delete'
							 onButtonClick={onButtonClick}
							 modalComponent={<KebabModal channelId={channel.id} members={channel.members} channelTitle={channel.title}/>}
							/>
						</div>

					))}
					{sessionUser.admin && (
						<OpenModalButton
							buttonText='Add Channel'
							onButtonClick={onButtonClick}
							modalComponent={<CreateChannelModal adminId={sessionUser.id} members={[]} channelTitle={''}/>}
						/>
					)}
				</nav>
			)}
		</div>
	);
}

export default Navigation;
