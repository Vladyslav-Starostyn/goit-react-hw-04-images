import PropTypes from 'prop-types';
import { ButtonStyled } from 'components/Button/ButtonStyled';

export const Button = ({ onClick, page, pages }) => {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      Load More {page}/{pages}
    </ButtonStyled>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};
