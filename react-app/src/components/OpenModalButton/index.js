import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenModalButton.css'
function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonClassName
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
      <button className={`modal-button-${buttonClassName}`} onClick={onClick}>
          {buttonText==='Delete' ? <i class="fa-solid fa-trash"></i> : buttonText==='Edit Channel' ? <i class="fa-solid fa-hammer"></i> : buttonText ==='Add channels' ?
          <div className='add-channel'>
            <i class="fa-solid fa-plus" />
            <div className='button-text'>{buttonText}</div>
          </div> : buttonText}
          <div className="delete-channel-text">Delete</div>
          <div className="edit-channel-text">Edit</div>
      </button>

  );
}

export default OpenModalButton;
