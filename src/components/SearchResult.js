import React, { useState, useEffect } from 'react';
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
import PriceUI from '../UI/PriceUI';
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

  useEffect(() => {
    setPage(0);
  }, [products]);
  //TODO: Conditional render for the table

  const tableStyle = {
    marginTop: '20px',
  };
  return (
    <TableContainer component={Paper} sx={tableStyle}>
      <Table aria-label="Product Table">
        <TableHead>
          <TableRow>
            <TableCell width="50%">Product</TableCell>
            <TableCell width="10%">Rating</TableCell>
            <TableCell width="10%">Price</TableCell>
            <TableCell width="10%">Brand</TableCell>
            {/* <TableCell>Image</TableCell> */}
            <TableCell width="10%">Age Group</TableCell>
            <TableCell width="10%">Adminstration Route</TableCell>
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
              adminstrationRoute,
            }) => {
              return (
                <TableRow id={id} key={id} scope="row">
                  <TableCell width="50%">{name}</TableCell>
                  <TableCell width="10%">
                    <RatingUI rating={rating} />
                  </TableCell>
                  <TableCell width="10%">
                    <PriceUI price={price} specialPrice={specialPrice} />
                  </TableCell>
                  <TableCell width="10%">{brand}</TableCell>
                  {/* <TableCell>
                      <ProductImage productName={name} imageLink={imageLink} />
                    </TableCell> */}
                  <TableCell width="10%">{ageGroup}</TableCell>
                  <TableCell width="10%">{adminstrationRoute}</TableCell>
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
