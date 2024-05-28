import React from 'react';
import { IFormStatus, IList, IProduct } from '../types';
import Product from './Product';
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import { formatCurrency } from '../utils';
import { BadgeDollarSign, BadgePercent, Calculator } from 'lucide-react';

function List() {
  const { id } = useParams();
  const [list, setList] = React.useState<IList | null>(null);
  const [products, setProducts] = React.useState<IProduct[] | null>(null);
  const [formStatus, setFormStatus] = React.useState<IFormStatus>({
    addBrandForm: null,
    updateProductForm: null,
  });
  const [total, setTotal] = React.useState(0);
  const [listMode, setListMode] = React.useState<'economia' | 'oferta'>(
    'economia',
  );

  function updateProductList(product: IProduct, deleteProduct: boolean) {
    if (!products) return;
    const fitleredList = products?.filter((prod) => prod._id !== product._id);
    if (deleteProduct) return setProducts(fitleredList);
    const updatedProductList = products?.map((prod) => {
      if (prod._id === product._id) {
        prod = product;
      }
      return prod;
    });
    const newList =
      fitleredList?.length < products.length
        ? updatedProductList
        : [...products, product];
    if (products) setProducts(newList);
  }

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
      <header className="flex flex-col items-center pt-6 mb-8">
        <h1 className="font-bold text-8xl font-sairaStencil text-downriver-950 select-none">
          {list?.name}
        </h1>
        <h2 className="flex items-center font-bold text-3xl mb-4 font-sairaStencil text-downriver-950 select-none">
          <Calculator />
          <span>R$ {formatCurrency(total)}</span>
        </h2>
        <ProductForm list={{ id: id, updateProductList }} />
        <div className="flex w-[342px] select-none gap-1 items-center mt-1">
          <span
            className="flex w-[171px] justify-end gap-1 items-center group cursor-pointer"
            onClick={() => setListMode('economia')}
          >
            <span className="font-bold text-downriver-950 text-right text-sm leading-3">
              Priorizar
              <br />
              Economia
            </span>
            <span
              className={`w-[30px] h-[30px] rounded-full relative inline-flex items-center justify-start overflow-hidden font-medium transition-all text-downriver-950 group ${
                listMode === 'economia'
                  ? 'bg-downriver-950 hover:bg-downriver-950 focus:bg-downriver-950'
                  : 'hover:bg-downriver-50 focus:bg-downriver-50'
              }`}
            >
              <span className="bg-downriver-950 w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-1000 transition-all translate-y-full mb-0 ml-0 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-focus:ml-0 group-focus:mb-32 group-focus:translate-x-0"></span>
              <BadgeDollarSign
                className={`absolute w-full transition-colors duration-300 ease-in-out  ${
                  listMode === 'economia'
                    ? 'text-aquamarine-50'
                    : 'group-hover:text-aquamarine-50 group-focus:text-aquamarine-50'
                }`}
                strokeWidth={1.5}
                size={30}
              />
            </span>
          </span>
          <span
            className="flex w-[171px] justify-start gap-1 items-center group cursor-pointer"
            onClick={() => setListMode('oferta')}
          >
            <span
              className={`w-[30px] h-[30px] rounded-full relative inline-flex items-center justify-start overflow-hidden font-medium transition-all text-downriver-950 group ${
                listMode === 'oferta'
                  ? 'bg-downriver-950 hover:bg-downriver-950 focus:bg-downriver-950'
                  : 'hover:bg-downriver-50 focus:bg-downriver-50'
              }`}
            >
              <span className="bg-downriver-950 w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-1000 transition-all translate-y-full mb-0 ml-0 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 group-focus:ml-0 group-focus:mb-32 group-focus:translate-x-0"></span>
              <BadgePercent
                className={`absolute w-full transition-colors duration-300 ease-in-out  ${
                  listMode === 'oferta'
                    ? 'text-aquamarine-50'
                    : 'group-hover:text-aquamarine-50 group-focus:text-aquamarine-50'
                }`}
                strokeWidth={1.5}
                size={30}
              />
            </span>
            <span className="font-bold text-downriver-950 text-left text-sm leading-3">
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
                list={{ total, setTotal, listMode, updateProductList }}
                form={{ formStatus, setFormStatus }}
                product={product}
              />
            );
          })}
      </ul>
    </>
  );
}

export default List;
