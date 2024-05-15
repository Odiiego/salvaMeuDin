import React from 'react';
import Brand from './Brand';
import { IProduct } from '../types';
import BrandForm from './BrandForm';
import { getBestMetrics, getBrandMetrics } from '../utils';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';

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
  const { bestCostPerUnit, bestCostProjection } = getBestMetrics(
    product.quantity,
    brands,
  );
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
      <span>
        <span className="flex items-center">
          {activeForm !== product._id && (
            <span className="flex gap-1 items-center">
              <input
                className="accent-teal-300"
                type="checkbox"
                name={product.name}
                onChange={handleCheck}
              />
              <span className="w-14 font-medium inline-block leading-5">
                {product.quantity}
                <span className="text-xs">un</span>
              </span>
              <span className="w-[285px] font-medium  align-text-bottom inline-block leading-5 truncate">
                {product.name}
              </span>
            </span>
          )}
          {activeForm === product._id && (
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
      </span>
      {brands.length > 0 && (
        <p>
          <span className="flex gap-1">
            <span
              className={
                'w-14 ml-[34px] font-bold text-right text-xs leading-3'
              }
            >
              quant
            </span>
            <span className="w-24 font-bold text-right text-xs leading-3">
              preço
            </span>
            <span className="w-32 font-bold text-right text-xs leading-3">
              marca
            </span>
            <span className="w-24 font-bold text-right text-xs leading-3">
              preço/un
            </span>
          </span>
        </p>
      )}

      <ul>
        {brands &&
          brands.map((brand) => {
            const { costPerUnit, costProjection } = getBrandMetrics(
              product.quantity,
              brand.quantity,
              brand.price,
            );
            return (
              <Brand
                key={brand._id}
                brand={brand}
                badges={{
                  costProjection: bestCostProjection === costProjection,
                  costPerUnit: bestCostPerUnit === costPerUnit,
                }}
              />
            );
          })}
      </ul>
    </li>
  );
}

export default Product;
