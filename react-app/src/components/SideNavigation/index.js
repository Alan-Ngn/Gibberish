import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import CreateChannelModal from '../CreateChannel';
import { loadUsersThunk } from '../../store/user';
import ChannelDropdown from '../ChannelMenu';

function Navigation({ socket, isLoaded }){
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const [selectChannel, setSelectChannel] = useState(0)
	console.log(selectChannel,'testing channel id')
	const onButtonClick = (e) =>{
		dispatch(loadUsersThunk())
	}

	return (
		<>
		{/* <nav className='main-nav'> */}
			{isLoaded && sessionUser && (
				<nav className='side-nav'>
					<h2 className='content-header'>Workspace</h2>
					<p className='channel-header'>Channels</p>
					{sessionUser.channels && sessionUser.channels.map((channel)=>(

						<div className={'channel-nav' + (channel.id === selectChannel ? '-highlight' : '')}>
							<NavLink onClick={()=>{setSelectChannel(channel.id)}} className={'nav-channel-title' + (channel.id === selectChannel ? '-highlight' : '')} to={`/channels/${channel.id}`}>{`# ${channel.title}`}</NavLink>
							{sessionUser.id === channel.admin_id && (
								<ChannelDropdown socket={socket} id={channel.id} members={channel.members} channelTitle={channel.title}/>
							)}
						</div>


					))}
					{sessionUser.admin && (
						<OpenModalButton
							buttonText='Add channels'
							onButtonClick={onButtonClick}
							modalComponent={<CreateChannelModal socket={socket} adminId={sessionUser.id} members={[sessionUser]} channelTitle={''} type={'create'}/>}
						/>
					)}
				</nav>
			)}
		{/* </nav> */}
		</>
	);
}

export default Navigation;
