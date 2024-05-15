import { BadgeDollarSignIcon, BadgePercentIcon } from 'lucide-react';
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
    <li className="ml-0">
      <span>
        <span className="flex leading-5 text-right gap-1">
          <span className="flex w-[30px]">
            <>
              {badges.costPerUnit && (
                <BadgePercentIcon
                  className="ml-auto"
                  color={'white'}
                  strokeWidth={2}
                  fill="rgb(94 234 212)"
                  size={20}
                />
              )}
              {badges.costProjection && (
                <BadgeDollarSignIcon
                  className={`
                    ${
                      badges.costPerUnit && badges.costProjection
                        ? 'ml-[-30px] z-[-10]'
                        : 'ml-auto'
                    }`}
                  color={'white'}
                  strokeWidth={2}
                  fill="rgb(94 234 212)"
                  size={20}
                />
              )}
            </>
          </span>

          <span className="w-14 leading-5 text-right">
            {brand.quantity}
            <span className="text-xs">un</span>
          </span>
          <span className="w-24 leading-5 text-right">
            <span className="text-xs">R$</span>
            {formatCurrency(brand.price)}
          </span>
          <span className="w-32 leading-5 text-right truncate">
            {brand.name}
          </span>
          <span className="w-24 leading-5 text-right">
            <span className="text-xs">R$</span>
            {formatCurrency(brand.price / brand.quantity)}
            <span className="text-xs">/un</span>
          </span>
        </span>
      </span>
    </li>
  );
}

export default Brand;
