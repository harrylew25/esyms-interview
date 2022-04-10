import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import SearchResult from './SearchResult';
import dataFactory from '../utils/dataFactory';
import ErrorAlert from '../UI/ErrorAlert';

const GETPRODUCTSURL = `https://staging-backend.esyms-api.com/esyms/website/product/front-condition?name=`;
const INIT = {
  method: 'GET',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
};
const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [firstTimeLanding, setFirstTimeLanding] = useState(true);
  const [serviceCallError, setServiceCallError] = useState(false);
  const [loading, setLoading] = useState(false);

  //keyboard interaction
  const searchBarOnKeyUp = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      let inputValue = encodeURI(event.target.value.trim().toLowerCase());
      if (inputValue !== '') {
        setSearchText(inputValue);
      }
    }
  };

  //search icon click handler
  const searchIconClickHandler = () => {
    const searchInput = document.getElementById('searchInput');
    const searchInputValue = searchInput.value.toLowerCase().trim();
    if (searchInputValue !== '') {
      setSearchText(searchInputValue);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      if (searchText === '') return;
      let url = `${GETPRODUCTSURL}${searchText}`;
      const response = await fetch(url, INIT);

      if (!response.ok) {
        setLoading(false);
        console.log(new Error(`${response.status} ${response.statusText}`));
      }

      const responseData = await response.json();
      const responseProducts = responseData.results.docs;
      //format the raw data into an array of objects and sorted with 5 stars products first
      const productArray = responseProducts
        .map((item) => {
          return dataFactory(item);
        })
        .sort((productA, productB) => {
          return productB.rating - productA.rating;
        });
      setProducts(productArray);
      setFirstTimeLanding(false);
      setLoading(false);
    };

    fetchProducts()
      .then()
      .catch((error) => {
        setFirstTimeLanding(false);
        setServiceCallError(true);
        setLoading(false);
      });
  }, [searchText]);

  const renderResult = loading ? (
    <CircularProgress />
  ) : (
    <SearchResult products={products} searchText={searchText} />
  );

  return (
    <>
      <TextField
        id="searchInput"
        label="Search Bar"
        variant="standard"
        type="search"
        color="primary"
        onKeyUp={searchBarOnKeyUp}
        autoFocus
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={searchIconClickHandler}>
              <IconButton name="searchInput">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {firstTimeLanding && (
        <Typography variant="body1" align="center" sx={{ marginTop: '20px' }}>
          Please start typing to search for an item. Press Enter or click search
          icon to perform search.
        </Typography>
      )}
      {!firstTimeLanding && !serviceCallError && renderResult}
      {!firstTimeLanding && serviceCallError && <ErrorAlert />}
    </>
  );
};

export default SearchBar;
