import React from 'react';
import styles from './Brand.module.scss';
import { CiTrash } from 'react-icons/ci';

const Brand = ({ data }) => {
  const [brand, setBrand] = React.useState(data);

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

    setBrand(null);
  }

  return (
    brand && (
      <li className={styles.brand}>
        <p className={styles.brand__price}>
          <span>R$</span>
          {brand.price.toFixed(2).replace('.', ',')}
        </p>
        <p className={styles.brand__quantity}>
          {brand.quantity}
          <span>un</span>
        </p>
        <p className={styles.brand__name}>{brand.name}</p>
        <p className={styles.brand__unitPrice}>
          <span>R$</span>
          {brand.unitPrice.toFixed(2).replace('.', ',')}
          <span>/un</span>
        </p>
        <button className={styles.button} onClick={deleteBrand}>
          <CiTrash className={styles.icon} />
        </button>
      </li>
    )
  );
};

export default Brand;
