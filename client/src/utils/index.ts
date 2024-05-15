import { IBrand } from '../types';

export function formatCurrency(valor: number) {
  const v = valor / 100;
  return v.toLocaleString('pt-br', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getCostPerUnit(price: number, quantity: number) {
  return price / quantity;
}

export function getCostProjection(
  intendedQuantity: number,
  quantity: number,
  price: number,
) {
  return Math.ceil(intendedQuantity / quantity) * price;
}

export function getBrandMetrics(
  intendedQuantity: number,
  quantity: number,
  price: number,
) {
  const metrics = {
    costPerUnit: getCostPerUnit(price, quantity),
    costProjection: getCostProjection(intendedQuantity, quantity, price),
  };

  return metrics;
}

export function getBestMetrics(intendedQuantity: number, brands: IBrand[]) {
  let bestCostPerUnit: number | null = null;
  let bestCostProjection: number | null = null;
  brands.map((brand) => {
    const { costPerUnit, costProjection } = getBrandMetrics(
      intendedQuantity,
      brand.quantity,
      brand.price,
    );
    if (!bestCostPerUnit || bestCostPerUnit > costPerUnit) {
      bestCostPerUnit = costPerUnit;
    }
    if (!bestCostProjection || bestCostProjection > costProjection) {
      bestCostProjection = costProjection;
    }
  });
  return { bestCostPerUnit, bestCostProjection };
}
