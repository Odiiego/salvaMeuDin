import React from 'react';

const Brand = ({ data }) => {
  const brand = data;
  return (
    <p>
      R${brand.price} {brand.quantity}un {brand.name}
    </p>
  );
};

export default Brand;
