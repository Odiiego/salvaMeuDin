import React from 'react';
import { IBrand, IMetrics, IProduct } from '../types';
import BrandForm from './BrandForm';
import { SquareChevronLeft, SquareChevronRight, SquareX } from 'lucide-react';
import BrandList from './BrandList';
import { getBestMetrics, getCostProjection } from '../utils';
import UpdateProductForm from './UpdateProductForm';
import IconButton from './IconButton';
import { useListContext } from '../hooks/useListContext';

interface ProductProps {
  product: {
    index: number;
    product: IProduct;
  };
}

function Product({ product: { index, product } }: ProductProps) {
  const {
    displayAddBrandForm,
    displayUpdateProductForm,
    toggleAddBrandForm,
    toggleUpdateProductForm,
    manipulateProductList,
  } = useListContext();
  const [selectedBrand, setSelectedBrand] = React.useState<IBrand | null>(null);
  const [defaultPrice, setDefaultPrice] = React.useState(0);
  const [brands, setBrands] = React.useState(product.brands);
  const [checkStatus, setCheckStatus] = React.useState(false);
  const [defaultMetrics, setDefaultMetrics] = React.useState<IMetrics | null>(
    null,
  );
  const [prevPrice, setPrevPrice] = React.useState(0);
  const { listMode, updateTotal } = useListContext();

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
          ? product.bestMetrics.costProjection.value
          : product.bestMetrics.costPerUnit.value,
      );
      if (prevPrice === 0) {
        setPrevPrice(defaultPrice);
      }
    }
  }, [
    brands,
    defaultPrice,
    listMode,
    prevPrice,
    product.bestMetrics.costPerUnit.value,
    product.bestMetrics.costProjection.value,
    product.quantity,
  ]);

  React.useEffect(() => {
    const price = selectedBrand
      ? getCostProjection(
          product.quantity,
          selectedBrand.quantity,
          selectedBrand.price,
        )
      : defaultPrice;
    if (checkStatus) updateTotal(-prevPrice + price);
    setPrevPrice(price);
  }, [
    checkStatus,
    defaultPrice,
    prevPrice,
    product.quantity,
    selectedBrand,
    updateTotal,
  ]);

  async function deleteProduct() {
    await fetch(`http://localhost:8080/products/${product._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    manipulateProductList({ productIndex: index });
    toggleUpdateProductForm(index);
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
    checkStatus ? updateTotal(-price) : updateTotal(price);
  }

  return (
    <li className="flex flex-col select-none cursor-text items-center justify-center">
      <span className="flex">
        {!displayAddBrandForm(index) && !displayUpdateProductForm(index) ? (
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
              onDoubleClick={() => toggleUpdateProductForm(index)}
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
        ) : displayAddBrandForm(index) ? (
          <BrandForm product={{ id: product._id, brands, setBrands }} />
        ) : (
          <UpdateProductForm product={{ index: index, product }} />
        )}
        {displayUpdateProductForm(index) ? (
          <IconButton onClick={deleteProduct}>
            <SquareX strokeWidth={1.5} size={30} />
          </IconButton>
        ) : (
          <IconButton onClick={() => toggleAddBrandForm(index)}>
            {displayAddBrandForm(index) ? (
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
