import React from 'react';
import { IProduct } from '../types';
import BrandForm from './BrandForm';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';
import BrandList from './BrandList';

interface ProductProps {
  product: IProduct;
  list: {
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
  };
  form: {
    activeForm: string | null;
    setActiveForm: React.Dispatch<React.SetStateAction<string | null>>;
  };
}

function Product({
  product,
  form: { activeForm, setActiveForm },
  list: { total, setTotal },
}: ProductProps) {
  const [brands, setBrands] = React.useState(product.brands);
  const [checkStatus, setCheckStatus] = React.useState(false);

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckStatus(e.target.checked);
    // if (!bestPrice) return;
    // checkStatus
    //   ? list.setTotal(list.total - bestPrice.price)
    //   : list.setTotal(list.total + bestPrice.price);
  }
  return (
    <li className="mt-1.5 flex flex-col items-center justify-center">
      <span className="flex justify-center items-center">
        {activeForm !== product._id ? (
          <span className="flex gap-1 items-center">
            <input
              className="accent-teal-300 cursor-pointer"
              type="checkbox"
              name={product.name}
              onChange={handleCheck}
            />
            <span className="w-14 font-medium inline-block leading-5">
              {product.quantity}
              <span className="text-xs">un</span>
            </span>
            <span className="w-[231px] font-medium  align-text-bottom inline-block leading-5 truncate">
              {product.name}
            </span>
          </span>
        ) : (
          <BrandForm product={{ id: product._id, brands, setBrands }} />
        )}
        <button
          onClick={() => {
            setActiveForm(product._id === activeForm ? null : product._id);
          }}
          className={
            'ml-1 w-[30px] h-[30px] relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group'
          }
          type="submit"
        >
          <span
            className={`bg-teal-300 w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0`}
          ></span>
          {activeForm === product._id ? (
            <SquareChevronLeft
              className="absolute w-full transition-colors duration-300 ease-in-out group-hover:text-white"
              strokeWidth={1.5}
              size={30}
            />
          ) : (
            <SquareChevronRight
              className="absolute w-full transition-colors duration-300 ease-in-out group-hover:text-white"
              strokeWidth={1.5}
              size={30}
            />
          )}
        </button>
      </span>
      {brands.length > 0 && (
        <BrandList product={{ quantity: product.quantity }} brands={brands} />
      )}
    </li>
  );
}

export default Product;
