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
  Typography,
} from '@mui/material';
import ProductListTableCell from './ProductListTableCell';

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

  const tableStyle = {
    marginTop: '20px',
  };

  const hideXSStyle = {
      display: {
        xs: 'none',
        sm: 'table-cell',
      },
    },
    smallScreenStyle = {
      display: {
        xs: 'none',
        sm: 'none',
        md: 'table-cell',
        lg: 'table-cell',
      },
    },
    mediumScreenStyle = {
      display: {
        xs: 'none',
        sm: 'none',
        md: 'none',
        lg: 'table-cell',
      },
    },
    noResult = {
      marginTop: '20px',
    },
    tableHeader = {
      background: 'rgb(109, 200, 191)',
      fontWeight: 500,
    };
  const tableHtml = (
    <TableContainer component={Paper} sx={tableStyle}>
      <Table aria-label="Product Table">
        <TableHead sx={tableHeader}>
          <TableRow>
            <TableCell width="40%">Product</TableCell>
            <TableCell width="10%" sx={hideXSStyle}>
              Rating
            </TableCell>
            <TableCell width="10%">Price</TableCell>
            <TableCell width="10%">Brand</TableCell>
            <TableCell width="10%" sx={mediumScreenStyle}>
              Age Group
            </TableCell>
            <TableCell width="10%" sx={mediumScreenStyle}>
              Administration Route
            </TableCell>
            <TableCell width="10%" sx={smallScreenStyle}>
              Image
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <ProductListTableCell
            products={
              rowsPerPage > 0
                ? products.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : products
            }
          />
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
  return (
    <>
      {products && products.length === 0 ? (
        <Typography variant="h4" sx={noResult} align="center">
          Unfortunately, we dont have any result for that. Please search for a
          different product.
        </Typography>
      ) : (
        tableHtml
      )}
    </>
  );
};

export default SearchResult;
