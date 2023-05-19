import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenModalButton.css'
function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    console.log('did i get clicked?')
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
      <button className='modal-button' onClick={onClick}>
          {buttonText==='Edit/Delete' ? <i class="fa-solid fa-ellipsis-vertical"></i> : buttonText ==='Add channels' ?
          <div className='add-channel'>
            <i class="fa-solid fa-plus" />
            <div className='button-text'>{buttonText}</div>
          </div> : buttonText}
      </button>

  );
}

export default OpenModalButton;
