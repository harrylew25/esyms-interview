import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Alert,
  AlertTitle,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import SearchResult from './SearchResult';
import dataFactory from '../utils/dataFactory';

const SearchBar = () => {
  let timer;
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [firstTimeLanding, setFirstTimeLanding] = useState(true);
  const [serviceCallError, setServiceCallError] = useState(false);

  const searchBarChangeHandler = (event) => {
    //adding a timeout to prevent recording of every single type
    clearTimeout(timer);
    timer = setTimeout(() => {
      let inputValue = encodeURI(event.target.value.trim().toLowerCase());
      if (inputValue !== '') {
        setSearchText(inputValue);
      }
    }, 1000);
  };

  //keyboard interaction
  const searchBarOnKeyUp = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      let inputValue = encodeURI(event.target.value.trim().toLowerCase());
      if (inputValue !== '') {
        setSearchText(inputValue);
        fetchProducts();
      }
    }
  };

  //TODO: Need to move this to separate file
  const fetchProducts = async () => {
    //TODO: remember to change this back to the useState variable
    //prevent user request for data without typing anything.
    const text = 'multivitamin';
    if (searchText.trim() === '') return;
    let url = `https://staging-backend.esyms-api.com/esyms/website/product/front-condition?name=${text}`;
    const INIT = {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };

    try {
      const response = await fetch(url, INIT);
      if (!response.ok) {
        setFirstTimeLanding(false);
        setServiceCallError(true);
        //Logging the error to server(but here to console)
        console.log(new Error(`${response.status} ${response.statusText}`));
      }
      const responseObject = await response.json();
      const responseProducts = responseObject.results.docs;

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
    } catch (error) {
      setFirstTimeLanding(false);
      setServiceCallError(true);
      //Logging the error to server(but here to console)
      console.log(new Error(`Looks like there was a problem: ${error}`));
    }
  };

  return (
    <>
      <TextField
        id="searchInput"
        label="Search Bar"
        variant="filled"
        type="search"
        color="primary"
        onChange={searchBarChangeHandler}
        onKeyUp={searchBarOnKeyUp}
        autoFocus
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={fetchProducts}>
                <Search color="action" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {firstTimeLanding === true ? (
        <Typography variant="h3">
          Please start typing to search for an item.
        </Typography>
      ) : serviceCallError === true ? (
        // TODO: Need to move this to a separate location, this one need context
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          There is an error, please try again.
        </Alert>
      ) : (
        <SearchResult products={products} searchText={searchText} />
      )}
    </>
  );
};

export default SearchBar;
