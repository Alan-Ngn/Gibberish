import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../CreateChannel";
import DeleteChannelModal from "../DeleteChannel";


function ChannelDropdown({channelId, members, channelTitle}) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    
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
      <button onClick={openMenu}>
        <i class="fa-solid fa-ellipsis-vertical" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {
          <>
            <OpenModalButton
            buttonText='Delete Channel'
            modalComponent={<DeleteChannelModal channelId={channelId} />}
            />
            <OpenModalButton
            buttonText='Edit Channel'
            modalComponent={<CreateChannelModal channelId={channelId} members={members} channelTitle={channelTitle}/>}
            />
          </>
        }
      </ul>
    </>
  );
}

export default ChannelDropdown;
