import { Component } from 'react';
import { GlobalStyle } from 'components/GlobalStyle';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppStyled } from 'components/App/AppStyled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ErrorMessage } from 'components/App/AppStyled';
import { ITEMS_PER_PAGE, fetchImages } from '../../services/fetchImages';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    status: 'idle',
    page: 1,
    errorMessage: '',
    totalHits: '',
    showBtn: 'folse',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setStatus('loading');

      fetchImages(searchQuery, page).then(data => {
        if (data.hits.length < 1) {
          this.setStatus('rejected');
        } else {
          this.setStatus('resolved');
        }

        this.setState(state => ({
          images: [...state.images, ...data.hits],
          totalHits: Math.ceil(data.totalHits / ITEMS_PER_PAGE),
          showBtn: page < Math.ceil(data.totalHits / ITEMS_PER_PAGE),
        }));
      });
    }
  }

  setSearchQuery = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  onLoadMoreClick = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleLoading = () => {
    this.setState(state => ({ loading: !state.loading }));
  };
  setStatus = newStatus => {
    this.setState({ status: newStatus });
  };

  render() {
    const { status, searchQuery, page, images, totalHits } = this.state;
    return (
      <AppStyled>
        <Searchbar onSubmit={this.setSearchQuery} />
        <ImageGallery
          items={images}
          query={searchQuery}
          page={page}
          setStatus={this.setStatus}
        />
        {status === 'loading' && <Loader />}
        {status === 'resolved' && this.state.showBtn && (
          <Button
            onClick={this.onLoadMoreClick}
            page={page}
            pages={totalHits}
          />
        )}
        {status === 'rejected' && (
          <ErrorMessage>Please enter another query </ErrorMessage>
        )}
        <GlobalStyle />
      </AppStyled>
    );
  }
}
