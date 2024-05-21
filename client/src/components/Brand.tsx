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
      className={`flex relative items-center w-fit box-border border-transparent border-b-2 cursor-pointer group`}
    >
      {(selectedBrandId === brand._id ||
        (!selectedBrandId && defaultBrand)) && (
        <span className="flex md:ml-[-17px] items-center absolute w-full z-[-10] ">
          {selectedBrandId === brand._id ? (
            <>
              <BadgeCheck
                className="text-white rounded-full bg-teal-300"
                size={17}
              />
            </>
          ) : !selectedBrandId && defaultBrand ? (
            <Badge className="text-white rounded-full bg-slate-400" size={17} />
          ) : (
            ''
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
