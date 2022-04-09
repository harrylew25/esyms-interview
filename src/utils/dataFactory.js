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
    price,
    specialPrice,
    rating,
    imageLink: img[0].src,
    brand,
    age,
  };

  return product;
};

export default dataFactory;
