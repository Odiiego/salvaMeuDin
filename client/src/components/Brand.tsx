import { IBrand } from '../types';
import { formatCurrency } from '../utils';

interface BrandProps {
  brand: IBrand;
  badges: {
    costProjection: boolean;
    costPerUnit: boolean;
  };
}

function Brand({ brand, badges }: BrandProps) {
  return (
    <li className="block w-fit">
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
