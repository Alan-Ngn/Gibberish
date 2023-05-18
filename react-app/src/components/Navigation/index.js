import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import CreateChannelModal from '../CreateChannel';
import { loadUsersThunk } from '../../store/user';
import DeleteChannelModal from '../DeleteChannel';

function Navigation({ isLoaded }){
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);

	const addChannel = (e) => {

	}

	const onButtonClick = (e) =>{
		dispatch(loadUsersThunk())
	}

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			{isLoaded && sessionUser && (
				<li>
					{sessionUser.channels && sessionUser.channels.map((channel)=>(
						<div>
							<NavLink to={`/channels/${channel.id}`}>{channel.title}</NavLink>
							<OpenModalButton
							 buttonText='Delete Channel'
							 modalComponent={<DeleteChannelModal channelId={channel.id}/>}
							/>
						</div>

					))}
					{sessionUser.admin && (
						<OpenModalButton
							buttonText='Add Channel'
							onButtonClick={onButtonClick}
							modalComponent={<CreateChannelModal adminId={sessionUser.id}/>}
						/>
					)}
				</li>
			)}
		</ul>
	);
}

export default Navigation;
