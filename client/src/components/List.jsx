import React from 'react';
import Product from './Product';
import { useParams } from 'react-router-dom';

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
    <>
      <h1>{list.name}</h1>
      <h2>{list.theme}</h2>
      <ul>
        {list.tags.map((tag, index) => {
          return <li key={index}>{`${tag} \t`}</li>;
        })}
      </ul>
      <form data-listid={list._id} onSubmit={addProduct}>
        <input placeholder="Quant" type="number" name="quantity" />
        <input placeholder="Product Name" type="text" required name="name" />
        <input type="submit" required value="Add Product" />
      </form>
      {list.productList.map((product) => {
        return <Product key={product._id} data={product} />;
      })}
    </>
  );
};

export default List;
