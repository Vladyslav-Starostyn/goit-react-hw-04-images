import PropTypes from 'prop-types';
import { ImageGalleryStyled } from 'components/ImageGallery/ImageGalleryStyled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({items}) => {
  return (
        <ImageGalleryStyled>
          {items.map(( {id, webformatURL, largeImageURL, tags} ) => {
            return (
              <ImageGalleryItem
                 key={id}
                 webformatURL={webformatURL}
                 tags={tags}
                 largeImageURL={largeImageURL}
              />
            );
          })}
        </ImageGalleryStyled>
    );
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
)};