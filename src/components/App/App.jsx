import { useEffect, useState } from 'react';
import { GlobalStyle } from 'components/GlobalStyle';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppStyled } from 'components/App/AppStyled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ErrorMessage } from 'components/App/AppStyled';
import { ITEMS_PER_PAGE, fetchImages } from '../../services/fetchImages';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState('');
  const [showBtn, setShowBtn] = useState('folse');

  useEffect(() => {
    if (searchQuery !== '' || page !== 1) {
      setStatus('loading');

      fetchImages(searchQuery, page).then(data => {
        if (data.hits.length < 1) {
          setStatus('rejected');
        } else {
          setStatus('resolved');
        }

        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalHits(Math.ceil(data.totalHits / ITEMS_PER_PAGE));
        setShowBtn(page < Math.ceil(data.totalHits / ITEMS_PER_PAGE));
      });
    }
  }, [page, searchQuery]);

  const setQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMoreClick = () => setPage(page + 1);

  const setNewStatus = newStatus => setStatus(newStatus);

  return (
    <AppStyled>
      <Searchbar onSubmit={setQuery} />
      <ImageGallery
        items={images}
        query={searchQuery}
        page={page}
        setStatus={setNewStatus}
      />
      {status === 'loading' && <Loader />}
      {status === 'resolved' && showBtn && (
        <Button onClick={onLoadMoreClick} page={page} pages={totalHits} />
      )}
      {status === 'rejected' && (
        <ErrorMessage>Please enter another query </ErrorMessage>
      )}
      <GlobalStyle />
    </AppStyled>
  );
};
