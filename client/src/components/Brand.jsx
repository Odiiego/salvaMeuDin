import React from 'react';

const Brand = ({ data }) => {
  const brand = data;

  async function deleteBrand() {
    await fetch(
      `http://localhost:5000/delete/${brand.listID}/${brand.productID}/${brand._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    window.location.reload();
  }

  return (
    <p>
      R${brand.price} {brand.quantity}un {brand.name} {brand.unitPrice}
      <button onClick={deleteBrand}>X</button>
    </p>
  );
};

export default Brand;
