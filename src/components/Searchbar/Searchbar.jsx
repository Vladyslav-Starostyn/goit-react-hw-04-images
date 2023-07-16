import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { FaSistrix } from 'react-icons/fa';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from 'components/Searchbar/SearchbarStyled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (values.query.trim() === '') {
      return alert('Please enter valid query:)');
    }
    onSubmit(values.query.trim());
    resetForm();
  };

  return (
    <Header>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchFormButton type="submit">
            <FaSistrix />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
