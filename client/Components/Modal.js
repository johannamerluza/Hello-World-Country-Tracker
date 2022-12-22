import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

function FancyModalButton(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
    // console.log('in toggleModal: ', e.target);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <span>
      <button className="modalButton" onClick={toggleModal}>
        &#9733;
      </button>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <div>
          {/* <h2>Notes:</h2> */}
          {/* <span>{props.title}</span> */}
          {props.text}
        </div>
        {/* <button onClick={toggleModal}>Close me</button> */}
      </StyledModal>
    </span>
  );
}

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

function ModalCopy(props) {
  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <span className="App">
        <FancyModalButton text={props.text} />
      </span>
    </ModalProvider>
  );
}

export { ModalCopy, FancyModalButton };
