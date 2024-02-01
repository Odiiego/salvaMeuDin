import React from 'react';
import Product from './Product';
import { useParams } from 'react-router-dom';
import styles from './List.module.scss';
import { CiCirclePlus } from 'react-icons/ci';

const List = () => {
  const { id } = useParams();
  const [list, setList] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:5000/${id}`);
      const data = await result.json();
      setList(data);
    };

    fetchData();
  }, []);

  async function addProduct(e) {
    e.preventDefault();

    const form = e.target;

    const newProduct = {
      listID: id,
      name: form.name.value,
      quantity: form.quantity.value,
    };

    await fetch(`http://localhost:5000/${form.dataset.listid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    form.name.value = '';
    form.quantity.value = '';
    window.location.reload();
  }

  return !list ? null : (
    <main className={styles.list}>
      <header className={styles.list__header}>
        <h1 className={styles.list__header__name}>{list.name}</h1>
        <h2 className={styles.list__header__theme}>{list.theme}</h2>
        <ul>
          {list.tags.map((tag, index) => {
            return (
              <li
                className={styles.list__header__tag}
                key={index}
              >{`${tag} \t`}</li>
            );
          })}
        </ul>
      </header>
      <section className={styles.list__content}>
        <form
          className={styles.form}
          data-listid={list._id}
          onSubmit={addProduct}
        >
          <input
            placeholder="Quant"
            type="number"
            name="quantity"
            className={styles.quantity}
          />
          <input
            placeholder="Product Name"
            type="text"
            required
            name="name"
            className={styles.name}
          />
          <button type="submit">
            <CiCirclePlus className={styles.icon} />
          </button>
        </form>
        {list.productList.map((product) => {
          return <Product key={product._id} data={product} />;
        })}
      </section>
    </main>
  );
};

export default List;
