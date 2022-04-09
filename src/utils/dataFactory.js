//TODO: Think of a better name

const priceFormatter = (price) => {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
  }).format(price);
};
const dataFactory = ({
  productId,
  name,
  price,
  specialPrice,
  rating,
  img,
  brand,
  age,
}) => {
  const product = {
    id: productId,
    name: name.en,
    price: priceFormatter(price),
    specialPrice: priceFormatter(specialPrice),
    rating,
    imageLink: img[0].src,
    brand,
    ageGroup: age,
  };

  return product;
};

export default dataFactory;
