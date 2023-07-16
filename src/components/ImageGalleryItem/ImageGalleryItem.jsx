import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import {
  GalleryItemStyled,
  GalleryImgStyled,
} from 'components/ImageGalleryItem/ImageGalleryItemStyled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setisModalOpen] = useState(false);

  const toggleModal = () => setisModalOpen(!isModalOpen);

  return (
    <GalleryItemStyled>
      <GalleryImgStyled src={webformatURL} alt={tags} onClick={toggleModal} />
      {isModalOpen && (
        <Modal
          largeImg={largeImageURL}
          about={tags}
          onModalClose={this.toggleModal}
        />
      )}
    </GalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
