import React from 'react';
import { Typography } from '@mui/material';

const priceFormatter = (price) => {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
  }).format(price);
};

const PriceUI = ({ price, specialPrice }) => {
  let priceStyle =
    specialPrice == null
      ? ''
      : {
          color: 'red',
          textDecoration: 'line-through',
        };
  return (
    <div>
      <div>
        <Typography sx={priceStyle}>{`${priceFormatter(price)}`}</Typography>
      </div>

      {/* {Only show special price if it exists} */}
      {specialPrice == null ? (
        ''
      ) : (
        <div>
          <Typography>{priceFormatter(specialPrice)}</Typography>
        </div>
      )}
    </div>
  );
};

export default PriceUI;
