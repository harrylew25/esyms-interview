import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
} from '@mui/material';
import RatingUI from '../UI/RatingUI';
// TODO: Move the image section somewhere?
// import ProductImage from '../UI/ProductImage';

const SearchResult = ({ products }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //TODO: Conditional render for the table
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Product Table">
        <TableHead>
          <TableRow>
            <TableCell width="30%">Product</TableCell>
            <TableCell width="10%">Rating</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Brand</TableCell>
            {/* <TableCell>Image</TableCell> */}
            <TableCell>Age Group</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? products.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : products
          ).map(
            ({
              id,
              name,
              price,
              specialPrice,
              rating,
              imageLink,
              brand,
              ageGroup,
            }) => {
              return (
                <TableRow id={id} key={id} component="th" scope="row">
                  <TableCell width="30%">{name}</TableCell>
                  <TableCell width="10%">
                    <RatingUI rating={rating} />
                  </TableCell>
                  <TableCell>{`${price} || ${specialPrice}`}</TableCell>
                  <TableCell>{brand}</TableCell>
                  {/* <TableCell>
                      <ProductImage productName={name} imageLink={imageLink} />
                    </TableCell> */}
                  <TableCell>{ageGroup}</TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default SearchResult;
