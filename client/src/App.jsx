import React from 'react';

function App() {
  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:5000/');
      const data = await result.json();
      setLists(data);
    };

    fetchData();
  }, [lists]);

  async function addList(e) {
    e.preventDefault();

    const form = e.target;

    const newList = {
      name: form.name.value,
      theme: form.theme.value,
      tags:
        form.tags.value.trim().split(/[, ]+/)[0] === ''
          ? []
          : form.tags.value.trim().split(/[, ]+/),
    };

    await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newList),
    });

    form.name.value = '';
    form.theme.value = '';
    form.tags.value = '';
  }

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
  }

  async function addBrand(e) {
    e.preventDefault();

    const form = e.target;

    const newBrand = {
      name: form.name.value,
      quantity: form.quantity.value,
      price: form.price.value,
    };

    await fetch(
      `http://localhost:5000/${form.dataset.listid}/${form.dataset.productid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBrand),
      },
    );

    form.name.value = '';
    form.quantity.value = '';
    form.price.value = '';
  }

  return (
    <>
      <form onSubmit={addList}>
        <input type="text" required name="name" />
        <input type="text" name="theme" />
        <input type="text" name="tags" />
        <input type="submit" required value="Add List" />
      </form>
      <ul>
        {lists.map((list) => {
          return (
            <li key={list._id}>
              <header>
                <p>
                  {list.name} - {list.theme} <br />
                  {list.tags.map((tag) => {
                    return <span key={tag}>{`${tag} \t`}</span>;
                  })}
                </p>

                <form data-listid={list._id} onSubmit={addProduct}>
                  <input type="text" required name="name" />
                  <input type="number" name="quantity" />
                  <input type="submit" required value="Add Product" />
                </form>
              </header>
              <ul>
                {list.productList.map((product) => {
                  return (
                    <li key={product._id}>
                      <header>
                        {product.quantity} - {product.name}
                        <form
                          data-listid={list._id}
                          data-productid={product._id}
                          onSubmit={addBrand}
                        >
                          <input type="text" required name="name" />
                          <input type="number" name="quantity" />
                          <input type="number" name="price" />
                          <input type="submit" required value="Add Brand" />
                        </form>
                      </header>
                      <ul>
                        {product.brandList.map((brand) => {
                          return (
                            <p>
                              {brand.quantity} - R${brand.price} - {brand.name}
                            </p>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
