import React, { useState } from 'react';
import { TextField } from '@mui/material';
import SearchResult from './SearchResult';
import dataFactory from '../utils/dataFactory';

const SearchBar = () => {
  let timer;
  let [searchText, setSearchText] = useState('');
  let [products, setProducts] = useState([]);

  //TODO: sanitizing the input
  const searchBarChangeHandler = (event) => {
    //adding a timeout to prevent recording of every single type
    clearTimeout(timer);
    timer = setTimeout(() => {
      let items = event.target.value;
      setSearchText(items);
    }, 1000);
  };

  //TODO: Need to move this to separate file
  const fetchProducts = async () => {
    //TODO: remember to change this back to the useState variable
    const text = 'multivitamin';
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
        throw Error(`${response.status} ${response.statusText}`);
      }
      const responseObject = await response.json();

      const responseProducts = responseObject.results.docs;

      const productArray = responseProducts
        .map((item) => {
          return dataFactory(item);
        })
        .sort((productA, productB) => {
          //display 5 stars rating products on top
          return productB.rating - productA.rating;
        });
      setProducts(productArray);
    } catch (error) {
      throw Error(`Looks like there was a problem: ${error}`);
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
        autoFocus
        fullWidth
      />
      <button onClick={fetchProducts}>Get Products</button>
      <SearchResult products={products} />
    </>
  );
};

export default SearchBar;
