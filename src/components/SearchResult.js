import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const SearchResult = ({ products }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Product Table">
        <TableHead>
          <TableRow>
            {/* 6 cells */}
            <TableCell>Product</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Vitamin</TableCell>
            <TableCell>5 stars</TableCell>
            <TableCell>139.99</TableCell>
            <TableCell>Image here</TableCell>
            <TableCell>Vitagen</TableCell>
            <TableCell>All Age</TableCell>
          </TableRow>
          {products.map(
            ({
              id,
              name,
              price,
              specialPrice,
              rating,
              imageLink,
              brand,
              age,
            }) => {
              return (
                <TableRow id={id} key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{`${
                    rating !== null ? rating : 0
                  } stars`}</TableCell>
                  <TableCell>{`${price} || ${specialPrice}`}</TableCell>
                  <TableCell>
                    <img
                      src={`https://cdn.esyms.com/${imageLink}`}
                      alt={name}
                    />
                  </TableCell>
                  <TableCell>{brand}</TableCell>
                  <TableCell>{age}</TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchResult;
