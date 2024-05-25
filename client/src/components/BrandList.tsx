import { IBrand, IMetrics } from '../types';
import Brand from './Brand';
import { getBestMetrics, getBrandMetrics } from '../utils';
import React from 'react';

interface BrandListProps {
  brands: IBrand[];
  product: {
    defaultMetrics: IMetrics | null;
    quantity: number;
    selectedBrand: IBrand | null;
    setSelectedBrand: React.Dispatch<React.SetStateAction<IBrand | null>>;
  };
}

function BrandList({
  brands,
  product: { quantity, defaultMetrics, selectedBrand, setSelectedBrand },
}: BrandListProps) {
  const { bestCostPerUnit, bestCostProjection } = getBestMetrics(
    quantity,
    brands,
  );

  return (
    <ul>
      <p className="flex gap-0.5">
        <span className={'w-12 font-bold text-right text-xs leading-3'}>
          quant
        </span>
        <span className="w-24 font-bold text-right text-xs leading-3">
          preço
        </span>
        <span className="w-24 font-bold text-right text-xs leading-3">
          preço/un
        </span>
        <span className="w-24 font-bold text-right text-xs leading-3">
          marca
        </span>
      </p>
      {brands.map((brand) => {
        const { costPerUnit, costProjection } = getBrandMetrics(
          quantity,
          brand.quantity,
          brand.price,
        );

        const defBrand = defaultMetrics?.costPerUnit
          ? defaultMetrics?.costPerUnit === costPerUnit &&
            defaultMetrics.price === costProjection
          : defaultMetrics?.costProjection === costProjection &&
            defaultMetrics.price === costProjection;
        return (
          <Brand
            key={brand._id}
            brandList={{
              selectedBrandId: selectedBrand?._id,
              defaultBrand: defBrand,
              setSelectedBrand,
            }}
            brand={brand}
            badges={{
              costProjection:
                bestCostProjection.costProjection === costProjection,
              costPerUnit: bestCostPerUnit.costPerUnit === costPerUnit,
            }}
          />
        );
      })}
    </ul>
  );
}

export default BrandList;
