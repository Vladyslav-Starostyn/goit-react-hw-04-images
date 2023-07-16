import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from 'components/Modal/ModalStyled';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onModalKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalKeydown);
  }

  onModalKeydown = event => {
    if (event.key === 'Escape') {
      this.props.onModalClose();
    }
  };

  onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { onModalClose, largeImg, about } = this.props;

    return (
      <Overlay onClick={onModalClose}>
        <ModalStyled>
          <img src={largeImg} alt={about} />
        </ModalStyled>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
