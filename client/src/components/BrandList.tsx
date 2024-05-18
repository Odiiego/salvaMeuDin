import { IBrand } from '../types';
import Brand from './Brand';
import { getBestMetrics, getBrandMetrics } from '../utils';

interface BrandListProps {
  brands: IBrand[];
  product: {
    quantity: number;
  };
}

function BrandList({ brands, product: { quantity } }: BrandListProps) {
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
        return (
          <Brand
            key={brand._id}
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
