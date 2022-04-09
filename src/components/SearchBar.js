import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';

const SearchBar = () => {
  let timer;
  let [searchText, setSearchText] = useState('');
  let [products, setProducts] = useState([]);

  const searchBarChangeHandler = (event) => {
    //adding a timeout to prevent recording of every single type
    //TODO: sanitizing the input
    clearTimeout(timer);
    timer = setTimeout(() => {
      let items = event.target.value;
      setSearchText(items);
    }, 1000);
  };

  //TODO: Need to move this to separate file
  const fetchProducts = async () => {
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
      //TODO: Create a util script for to manage the object creation
      setProducts(responseObject.results.docs);
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
      <div id="searchResult">{`Start here: ${searchText}`}</div>
      <div>
        {products.map((product, index) => {
          return (
            <div id={product} key={index}>
              {product}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchBar;
