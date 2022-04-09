import React from 'react';

const ProductImage = ({ productName, imageLink }) => {
  return (
    <img
      src={`https://cdn.esyms.com/${imageLink}`}
      alt={productName}
      width="240px"
      height="320px"
    />
  );
};

export default ProductImage;
