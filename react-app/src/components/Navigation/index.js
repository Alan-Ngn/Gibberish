import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import CreateChannelModal from '../CreateChannel';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const addChannel = (e) => {

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
			{isLoaded && sessionUser.channels && (
				<li>
					{sessionUser.channels.map((channel)=>(
						<NavLink to={`/channels/${channel.id}`}>{channel.title}</NavLink>
					))}
					{sessionUser.admin && (
						<OpenModalButton
							buttonText='Add Channel'
							modalComponent={<CreateChannelModal adminId={sessionUser.id}/>}
						/>
					)}
				</li>
			)}
		</ul>
	);
}

export default Navigation;
