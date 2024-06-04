import { IList } from '../types';
import Product from './Product';
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import { formatCurrency } from '../utils';
import { BadgeDollarSign, BadgePercent, Calculator } from 'lucide-react';
import { useListContext } from '../hooks/useListContext';
import useFetch from '../hooks/useFetch';
import IconButton from './IconButton';
import React from 'react';

function List() {
  const { id } = useParams();
  const { list, setList, total, listMode, toggleListMode } = useListContext();
  const { data, loading } = useFetch<IList>(
    `http://localhost:8080/lists/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  React.useEffect(() => {
    if (data) setList(data);
  }, [data, id, setList]);

  if (loading) return <p>carregando</p>;
  return (
    <>
      <header className="flex flex-col items-center pt-6 mb-8">
        <h1 className="font-bold text-8xl font-sairaStencil text-downriver-950 select-none">
          {list?.name}
        </h1>
        <h2 className="flex items-center font-bold text-3xl mb-4 font-sairaStencil text-downriver-950 select-none">
          <Calculator strokeWidth={1.5} size={30} />
          <span>R$ {formatCurrency(total)}</span>
        </h2>
        <ProductForm listId={id!} />
        <div className="flex w-[342px] select-none gap-1 items-center mt-1">
          <span
            className="flex w-1/2 justify-end gap-1 items-center group cursor-pointer"
            onClick={toggleListMode}
          >
            <span className="font-bold text-downriver-950 text-right text-sm leading-3">
              Priorizar
              <br />
              Economia
            </span>
            <IconButton
              badge={true}
              className={`rounded-full ${
                listMode === 'economia' ? 'bg-downriver-950' : ''
              }`}
            >
              <BadgeDollarSign
                className={`${
                  listMode === 'economia' ? 'text-aquamarine-50' : ''
                }`}
                strokeWidth={1.5}
                size={30}
              />
            </IconButton>
          </span>
          <span
            className="flex w-1/2 justify-start gap-1 items-center group cursor-pointer"
            onClick={toggleListMode}
          >
            <IconButton
              badge={true}
              className={`rounded-full ${
                listMode === 'oferta' ? 'bg-downriver-950' : ''
              }`}
            >
              <BadgePercent
                className={`${
                  listMode === 'oferta' ? 'text-aquamarine-50' : ''
                }`}
                strokeWidth={1.5}
                size={30}
              />
            </IconButton>
            <span className="font-bold text-downriver-950 text-left text-sm leading-3">
              Priorizar
              <br />
              Ofertas
            </span>
          </span>
        </div>
      </header>
      <ul>
        {list?.content.map((product, index) => {
          return (
            <Product key={product._id} product={{ index: index, product }} />
          );
        })}
      </ul>
    </>
  );
}

export default List;
