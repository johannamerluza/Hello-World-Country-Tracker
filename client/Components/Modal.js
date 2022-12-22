import React, { Component } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class ModalCopy extends Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <h2>react-responsive-modal</h2>
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={open} onClose={this.onCloseModal}>
          <ul>{'HELLO'}</ul>
          <form>
            <input type="text" value="toDos"></input>
          </form>
        </Modal>
      </div>
    );
  }
}

export default ModalCopy;
