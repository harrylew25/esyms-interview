//TODO: Think of a better name
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
    price: price,
    specialPrice: specialPrice,
    rating,
    imageLink: img[0].src,
    brand,
    ageGroup: age,
  };

  return product;
};

export default dataFactory;
