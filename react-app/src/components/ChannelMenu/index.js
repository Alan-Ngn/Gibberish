import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../CreateChannel";
import DeleteModal from "../DeleteChannel";
import { loadUsersThunk } from "../../store/user";
import './ChannelMenu.css'


function ChannelDropdown({id, members, channelTitle}) {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    dispatch(loadUsersThunk())

  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="channel-dropdown" onClick={openMenu}>
        <i class="fa-solid fa-ellipsis-vertical" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {
          <>
            <OpenModalButton
            buttonText='Delete Channel'
            modalComponent={<DeleteModal id={id} type={'channel'}/>}
            />
            <OpenModalButton
            buttonText='Edit Channel'
            modalComponent={<CreateChannelModal id={id} members={members} channelTitle={channelTitle} type={'edit'}/>}
            />
          </>
        }
      </ul>
    </>
  );
}

export default ChannelDropdown;
