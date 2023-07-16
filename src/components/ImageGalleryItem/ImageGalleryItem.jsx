import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import {
  GalleryItemStyled,
  GalleryImgStyled,
} from 'components/ImageGalleryItem/ImageGalleryItemStyled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isModalOpen } = this.state;
    return (
      <GalleryItemStyled>
        <GalleryImgStyled
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />
        {isModalOpen && (
          <Modal
            largeImg={largeImageURL}
            about={tags}
            onModalClose={this.toggleModal}
          />
        )}
      </GalleryItemStyled>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
