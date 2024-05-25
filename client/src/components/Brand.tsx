import { Badge, BadgeCheck } from 'lucide-react';
import { IBrand } from '../types';
import { formatCurrency } from '../utils';

interface BrandProps {
  brand: IBrand;
  brandList: {
    selectedBrandId: string | undefined;
    defaultBrand: boolean;
    setSelectedBrand: React.Dispatch<React.SetStateAction<IBrand | null>>;
  };
  badges: {
    costProjection: boolean;
    costPerUnit: boolean;
  };
}

function Brand({
  brand,
  badges,
  brandList: { selectedBrandId, defaultBrand, setSelectedBrand },
}: BrandProps) {
  return (
    <li
      onClick={() =>
        setSelectedBrand(selectedBrandId === brand._id ? null : brand)
      }
      className={`flex relative mb-[1px] items-center cursor-pointer`}
    >
      {(selectedBrandId === brand._id ||
        (!selectedBrandId && defaultBrand)) && (
        <span className="flex md:ml-[-17px] items-center absolute w-full">
          {selectedBrandId === brand._id ? (
            <BadgeCheck
              className="text-white rounded-full bg-downriver-950"
              size={17}
            />
          ) : (
            !selectedBrandId &&
            defaultBrand && (
              <Badge
                className="text-white rounded-full bg-downriver-200"
                size={17}
              />
            )
          )}
        </span>
      )}
      <span className="flex leading-5 gap-0.5">
        <span className="w-12 leading-5 text-right">
          {brand.quantity}
          <span className="text-xs">un</span>
        </span>
        <span
          className={`w-24 leading-5 text-right ${
            badges.costProjection ? 'font-bold' : ''
          }`}
        >
          <span className="text-xs font-normal">R$</span>
          {formatCurrency(brand.price)}
        </span>
        <span
          className={`w-24 leading-5 text-right truncate  ${
            badges.costPerUnit ? 'font-bold' : ''
          }`}
        >
          <span className="text-xs font-normal">R$</span>
          {formatCurrency(brand.price / brand.quantity)}
          <span className="text-xs font-normal">/un</span>
        </span>
        <span className="w-24 leading-5 text-right truncate">{brand.name}</span>
      </span>
    </li>
  );
}

export default Brand;
