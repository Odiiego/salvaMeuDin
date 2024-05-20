import React from 'react';
import { IList, IProduct } from '../types';
import Product from './Product';
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import { formatCurrency } from '../utils';
import { BadgeDollarSign, BadgePercent } from 'lucide-react';

function List() {
  const { id } = useParams();
  const [list, setList] = React.useState<IList | null>(null);
  const [products, setProducts] = React.useState<IProduct[] | null>(null);
  const [activeForm, setActiveForm] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState(0);
  const [listMode, setListMode] = React.useState<'economia' | 'oferta'>(
    'economia',
  );

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
        <div className="flex gap-1 items-center mt-1">
          <span
            className="flex gap-1 items-center group cursor-pointer"
            onClick={() => setListMode('economia')}
          >
            <span className={'font-bold text-right text-xs leading-3'}>
              Priorizar
              <br />
              Economia
            </span>
            <span
              className={`w-[30px] h-[30px] rounded-full relative inline-flex items-center justify-start overflow-hidden font-medium transition-all group ${
                listMode === 'economia'
                  ? 'bg-teal-300 hover:bg-teal-300 focus:bg-teal-300'
                  : 'bg-white hover:bg-white focus:bg-white'
              }`}
            >
              <span
                className={`bg-teal-300 w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-10 ml-10 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-focus:ml-0 group-focus:mb-32 group-focus:translate-x-0`}
              ></span>
              <BadgeDollarSign
                className={`absolute w-full transition-colors duration-300 ease-in-out  ${
                  listMode === 'economia'
                    ? 'text-white'
                    : 'group-hover:text-white group-focus:text-white'
                }`}
                strokeWidth={1.5}
                size={30}
              />
            </span>
          </span>
          <span
            className="flex gap-1 items-center group cursor-pointer"
            onClick={() => setListMode('oferta')}
          >
            <span
              className={`w-[30px] h-[30px] rounded-full relative inline-flex items-center justify-start overflow-hidden font-medium transition-all group ${
                listMode === 'oferta'
                  ? 'bg-teal-300 hover:bg-teal-300 focus:bg-teal-300'
                  : 'bg-white hover:bg-white focus:bg-white'
              }`}
            >
              <span
                className={
                  'bg-teal-300 w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-10 ml-10 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-focus:ml-0 group-focus:mb-32 group-focus:translate-x-0'
                }
              ></span>

              <BadgePercent
                className={`absolute w-full transition-colors duration-300 ease-in-out  ${
                  listMode === 'oferta'
                    ? 'text-white'
                    : 'group-hover:text-white group-focus:text-white'
                }`}
                strokeWidth={1.5}
                size={30}
              />
            </span>
            <span className={'font-bold text-left text-xs leading-3'}>
              Priorizar
              <br />
              Ofertas
            </span>
          </span>
        </div>
      </header>
      <ul>
        {products &&
          products.map((product) => {
            return (
              <Product
                key={product._id}
                list={{ total, setTotal, listMode }}
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
