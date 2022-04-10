import React from 'react';

const ProductImage = ({ productName, imageLink }) => {
  return (
    <img
      src={`https://cdn.esyms.com/${imageLink}`}
      alt={productName}
      width="120px"
      height="160px"
    />
  );
};

export default ProductImage;
