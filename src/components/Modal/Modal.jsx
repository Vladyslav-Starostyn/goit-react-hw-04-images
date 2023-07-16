import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalStyled } from 'components/Modal/ModalStyled';

export const Modal = ({ onModalClose, largeImg, about }) => {
  useEffect(() => {
    const onModalKeydown = event => {
      if (event.key === 'Escape') {
        onModalClose();
      }
    };

    window.addEventListener('keydown', onModalKeydown);
    return () => {
      window.removeEventListener('keydown', onModalKeydown);
    };
  }, [onModalClose]);

  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  return (
    <Overlay onClick={onBackdropClick}>
      <ModalStyled>
        <img src={largeImg} alt={about} />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
