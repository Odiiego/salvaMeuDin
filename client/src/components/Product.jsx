import React from 'react';
import Brand from './Brand';
import styles from './Product.module.scss';
import {
  CiCirclePlus,
  CiUndo,
  CiTrash,
  CiCircleChevDown,
} from 'react-icons/ci';

const Product = ({ data }) => {
  const [product, setProduct] = React.useState(data);
  const [activeForm, setActiveForm] = React.useState(false);
  const [activeBrandList, setActiveBrandList] = React.useState(false);

  function toggleBrandForm() {
    setActiveForm(!activeForm);
  }

  function toggleBrandList() {
    setActiveBrandList(!activeBrandList);
  }

  async function addBrand(e) {
    e.preventDefault();

    const form = e.target;

    const newBrand = {
      listID: product.listID,
      productID: product._id,
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

    const result = await fetch(
      `http://localhost:5000/get/${product.listID}/${product._id}`,
    );
    const data = await result.json();
    setProduct(data);
    setActiveBrandList(true);
  }

  async function deleteProduct() {
    await fetch(
      `http://localhost:5000/delete/${product.listID}/${product._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await fetch(
      `http://localhost:5000/get/${product.listID}/${product._id}`,
    );
    const data = await result.json();
    setProduct(data);
  }

  return (
    product && (
      <div className={styles.product}>
        <div className={styles.product__header}>
          {!activeForm ? (
            <>
              <label>
                <input type="checkbox" />
                <p className={styles.product__header__quantity}>
                  {product.quantity}
                  <span>un</span>
                </p>
                <p className={styles.product__header__name}>{product.name}</p>
                <span className={styles.btn__container}>
                  <button onClick={toggleBrandForm}>
                    <CiCirclePlus className={styles.icon} />
                  </button>
                  <button onClick={toggleBrandList}>
                    <CiCircleChevDown className={styles.icon} />
                  </button>
                  <button onClick={deleteProduct}>
                    <CiTrash className={styles.icon} />
                  </button>
                </span>
              </label>
            </>
          ) : (
            <>
              <form className={styles.form} onSubmit={addBrand}>
                <span>
                  <input
                    placeholder="Price"
                    step="0.01"
                    type="number"
                    name="price"
                    className={styles.price}
                  />
                  <input
                    placeholder="Quant"
                    step="0.01"
                    type="number"
                    name="quantity"
                    className={styles.quantity}
                  />
                  <input
                    placeholder="Brand name"
                    type="text"
                    required
                    name="name"
                    className={styles.name}
                  />
                </span>
                <span>
                  <button type="submit">
                    <CiCirclePlus className={styles.icon} />
                  </button>
                  <button onClick={toggleBrandForm}>
                    <CiUndo className={styles.icon} />
                  </button>
                  <button onClick={deleteProduct}>
                    <CiTrash className={styles.icon} />
                  </button>
                </span>
              </form>
            </>
          )}
        </div>
        <ul className={styles.product__content}>
          {product.brandList.map((brand) => {
            return <Brand key={brand._id} data={brand} />;
          })}
        </ul>
      </div>
    )
  );
};

export default Product;
