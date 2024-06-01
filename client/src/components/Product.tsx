import React from 'react';
import { IFormStatus, IBrand, IMetrics, IProduct } from '../types';
import BrandForm from './BrandForm';
import { SquareChevronLeft, SquareChevronRight, SquareX } from 'lucide-react';
import BrandList from './BrandList';
import { getBestMetrics, getCostProjection } from '../utils';
import UpdateProductForm from './UpdateProductForm';
import IconButton from './IconButton';

interface ProductProps {
  product: IProduct;
  list: {
    listMode: 'economia' | 'oferta';
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    updateProductList: (product: IProduct, deleteProduct: boolean) => void;
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

  async function deleteProduct() {
    const response = await fetch(
      `http://localhost:8080/products/${product._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    const updatedProduct: IProduct = await response.json();
    setFormStatus({ ...formStatus, updateProductForm: null });
    updateProductList(updatedProduct, true);
  }

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
    <li className="flex flex-col select-none cursor-text items-center justify-center">
      <span className="flex">
        {formStatus.addBrandForm !== product._id &&
        formStatus.updateProductForm !== product._id ? (
          <span className="flex gap-1 items-center">
            <input
              className="accent-downriver-950 cursor-pointer"
              type="checkbox"
              name={product.name}
              checked={checkStatus}
              onChange={handleCheck}
            />
            <span
              className="flex gap-1 items-center"
              onDoubleClick={() => {
                const productForm =
                  product._id === formStatus.updateProductForm
                    ? null
                    : product._id;
                setFormStatus({
                  ...formStatus,
                  updateProductForm: productForm,
                });
              }}
            >
              <span className="w-14 font-medium inline-block leading-5">
                {product.quantity}
                <span className="text-xs">un</span>
              </span>
              <span className="w-[231px] font-medium  align-text-bottom inline-block leading-5 truncate">
                {product.name}
              </span>
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
        {formStatus.updateProductForm === product._id ? (
          <IconButton onClick={deleteProduct}>
            <SquareX strokeWidth={1.5} size={30} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              const brandForm =
                product._id === formStatus.addBrandForm ? null : product._id;
              setFormStatus({
                updateProductForm: null,
                addBrandForm: brandForm,
              });
            }}
          >
            {formStatus.addBrandForm === product._id ? (
              <SquareChevronLeft strokeWidth={1.5} size={30} />
            ) : (
              <SquareChevronRight strokeWidth={1.5} size={30} />
            )}
          </IconButton>
        )}
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
