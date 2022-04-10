import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import RatingUI from '../UI/RatingUI';
import PriceUI from '../UI/PriceUI';
import ProductImage from '../UI/ProductImage';

const ProductListTableCell = ({ products }) => {
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
    };
  return products.map(
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
          <TableCell width="40%">{name}</TableCell>
          <TableCell width="10%" sx={hideXSStyle}>
            <RatingUI rating={rating} />
          </TableCell>
          <TableCell width="10%">
            <PriceUI price={price} specialPrice={specialPrice} />
          </TableCell>
          <TableCell width="10%">{brand}</TableCell>
          <TableCell width="10%" sx={mediumScreenStyle}>
            {ageGroup}
          </TableCell>
          <TableCell width="10%" sx={mediumScreenStyle}>
            {adminstrationRoute}
          </TableCell>
          <TableCell width="10%" sx={smallScreenStyle}>
            <ProductImage productName={name} imageLink={imageLink} />
          </TableCell>
        </TableRow>
      );
    }
  );
};

export default ProductListTableCell;
