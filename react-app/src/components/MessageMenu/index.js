import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../CreateChannel";
import DeleteModal from "../DeleteChannel";
import { loadUsersThunk } from "../../store/user";



function MessageDropdown({id, members, channelTitle, channelId}) {
  const dispatch = useDispatch()
  console.log(id,'mkessage id')
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
            buttonText='Delete Message'
            modalComponent={<DeleteModal id={id} type={'message'} channelId={channelId}/>}
            />
          </>
        }
      </ul>
    </>
  );
}

export default MessageDropdown;
