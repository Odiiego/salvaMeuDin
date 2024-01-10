import React from 'react';
import Brand from './Brand';

const Product = ({ data }) => {
  const product = data;

  async function addBrand(e) {
    e.preventDefault();

    const form = e.target;

    const newBrand = {
      name: form.name.value,
      quantity: form.quantity.value,
      price: form.price.value,
    };

    await fetch(`http://localhost:5000/${product.listID}/${product._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBrand),
    });

    form.name.value = '';
    form.quantity.value = '';
    form.price.value = '';
    window.location.reload();
  }

  return (
    <>
      <p>{`${product.quantity}un ${product.name}`}</p>
      <form onSubmit={addBrand}>
        <input placeholder="Price" type="number" name="price" />
        <input placeholder="Quant" type="number" name="quantity" />
        <input placeholder="Brand name" type="text" required name="name" />
        <input type="submit" required value="Add Brand" />
      </form>
      {product.brandList.map((brand) => {
        return <Brand key={brand._id} data={brand} />;
      })}
    </>
  );
};

export default Product;
