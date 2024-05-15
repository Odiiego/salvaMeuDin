import React from 'react';
import { IList, IProduct } from '../types';
import Product from './Product';
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import { formatCurrency } from '../utils';

function List() {
  const { id } = useParams();
  const [list, setList] = React.useState<IList | null>(null);
  const [products, setProducts] = React.useState<IProduct[] | null>(null);
  const [activeForm, setActiveForm] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    async function getList() {
      const response = await fetch(`http://localhost:8080/lists/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data: IList = await response.json();
      if (data) setList(data);
      if (data) setProducts(data.content);
    }

    getList();
  }, [id]);
  return (
    <>
      <header className="flex flex-col items-center mb-8">
        <h1 className="font-bold text-8xl">{list?.name}</h1>
        <h2 className="font-bold text-3xl mb-4">R$ {formatCurrency(total)}</h2>
        <ProductForm list={{ id: id, products, setProducts }} />
      </header>
      <ul>
        {products &&
          products.map((product) => {
            return (
              <Product
                key={product._id}
                list={{ total, setTotal }}
                form={{ activeForm, setActiveForm }}
                product={product}
              />
            );
          })}
      </ul>
    </>
  );
}

export default List;
