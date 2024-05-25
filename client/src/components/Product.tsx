import React from 'react';
import { IFormStatus, IBrand, IMetrics, IProduct } from '../types';
import BrandForm from './BrandForm';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';
import BrandList from './BrandList';
import { getBestMetrics, getCostProjection } from '../utils';
import UpdateProductForm from './UpdateProductForm';

interface ProductProps {
  product: IProduct;
  list: {
    listMode: 'economia' | 'oferta';
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    updateProductList: (product: IProduct) => void;
  };
  form: {
    formStatus: IFormStatus;
    setFormStatus: React.Dispatch<React.SetStateAction<IFormStatus>>;
  };
}

function Product({
  product,
  form: { formStatus, setFormStatus },
  list: { total, setTotal, listMode, updateProductList },
}: ProductProps) {
  const [selectedBrand, setSelectedBrand] = React.useState<IBrand | null>(null);
  const [defaultPrice, setDefaultPrice] = React.useState(0);
  const [brands, setBrands] = React.useState(product.brands);
  const [checkStatus, setCheckStatus] = React.useState(false);
  const [defaultMetrics, setDefaultMetrics] = React.useState<IMetrics | null>(
    null,
  );
  const [prevPrice, setPrevPrice] = React.useState(0);

  React.useEffect(() => {
    const { bestCostPerUnit, bestCostProjection } = getBestMetrics(
      product.quantity,
      brands,
    );

    setDefaultMetrics(
      listMode === 'economia' ? bestCostProjection : bestCostPerUnit,
    );

    if (bestCostPerUnit.price && bestCostProjection.price) {
      setDefaultPrice(
        listMode === 'economia'
          ? bestCostProjection.price
          : bestCostPerUnit.price,
      );
      if (prevPrice === 0) {
        setPrevPrice(defaultPrice);
      }
    }
  }, [brands, defaultPrice, listMode, prevPrice, product.quantity]);

  React.useEffect(() => {
    const price = selectedBrand
      ? getCostProjection(
          product.quantity,
          selectedBrand.quantity,
          selectedBrand.price,
        )
      : defaultPrice;
    if (checkStatus) setTotal(total - prevPrice + price);
    setPrevPrice(price);
  }, [
    checkStatus,
    defaultPrice,
    prevPrice,
    product.quantity,
    selectedBrand,
    setTotal,
    total,
  ]);

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckStatus(e.target.checked);
    const price = selectedBrand
      ? getCostProjection(
          product.quantity,
          selectedBrand.quantity,
          selectedBrand.price,
        )
      : defaultPrice;
    checkStatus ? setTotal(total - price) : setTotal(total + price);
  }

  return (
    <li className="mt-1.5 flex flex-col items-center justify-center">
      <span className="flex justify-center items-center">
        {formStatus.addBrandForm !== product._id &&
        formStatus.updateProductForm !== product._id ? (
          <span
            className="flex gap-1 items-center"
            onDoubleClick={() => {
              const productForm =
                product._id === formStatus.updateProductForm
                  ? null
                  : product._id;
              setFormStatus({ ...formStatus, updateProductForm: productForm });
            }}
          >
            <input
              className="accent-downriver-950 cursor-pointer"
              type="checkbox"
              name={product.name}
              checked={checkStatus}
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
        ) : formStatus.addBrandForm === product._id ? (
          <BrandForm product={{ id: product._id, brands, setBrands }} />
        ) : (
          <UpdateProductForm
            form={{ formStatus, setFormStatus }}
            product={{ product, updateProductList }}
          />
        )}
        <button
          onClick={() => {
            const brandForm =
              product._id === formStatus.addBrandForm ? null : product._id;
            setFormStatus({ updateProductForm: null, addBrandForm: brandForm });
          }}
          className={
            'ml-1 w-[30px] h-[30px] text-aquamarine-950 relative inline-flex items-center justify-start overflow-hidden font-medium transition-all rounded hover:bg-aquamarine-50 group'
          }
          type="submit"
        >
          <span
            className={`bg-aquamarine-600 w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-10 ml-10 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0`}
          ></span>
          {formStatus.addBrandForm === product._id ? (
            <SquareChevronLeft
              className="absolute text-downriver-950 w-full transition-colors duration-300 ease-in-out group-hover:text-aquamarine-50"
              strokeWidth={1.5}
              size={30}
            />
          ) : (
            <SquareChevronRight
              className="absolute text-downriver-950 w-full transition-colors duration-300 ease-in-out group-hover:text-aquamarine-50"
              strokeWidth={1.5}
              size={30}
            />
          )}
        </button>
      </span>
      {brands.length > 0 && (
        <BrandList
          product={{
            quantity: product.quantity,
            selectedBrand,
            defaultMetrics,
            setSelectedBrand,
          }}
          brands={brands}
        />
      )}
    </li>
  );
}

export default Product;
