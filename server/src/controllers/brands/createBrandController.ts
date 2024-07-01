import express from 'express';
import { getPathToProduct } from '../products/helpers';
import { getUserById } from '../users/helpers';

export const createBrandController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const { userId, listId } = await getPathToProduct(id);

    const user = await getUserById(userId);
    const list = user?.lists.id(listId);
    const product = list?.content.id(id);

    const brandCostPerUnit = (price / quantity) * 100;
    const brandCostProjection =
      Math.ceil(product?.quantity! / quantity) * (price * 100);
    if (product && product.bestMetrics) {
      product.bestMetrics.costPerUnit = {
        quantity:
          !product.bestMetrics?.costPerUnit?.value ||
          product.bestMetrics.costPerUnit.value /
            product.bestMetrics.costPerUnit.quantity >
            brandCostPerUnit
            ? quantity
            : product.bestMetrics.costPerUnit.quantity,
        value:
          !product.bestMetrics?.costPerUnit?.value ||
          product.bestMetrics.costPerUnit.value /
            product.bestMetrics.costPerUnit.quantity >
            brandCostPerUnit
            ? brandCostProjection
            : product.bestMetrics.costPerUnit.value,
      };

      product.bestMetrics.costProjection = {
        quantity:
          !product.bestMetrics?.costProjection?.value ||
          product.bestMetrics.costProjection.value > brandCostProjection
            ? quantity
            : product.bestMetrics.costProjection.quantity,
        value:
          !product.bestMetrics?.costProjection?.value ||
          product.bestMetrics.costProjection.value > brandCostProjection
            ? brandCostProjection
            : product.bestMetrics.costProjection.value,
      };
    }

    product?.brands.push({
      name,
      quantity,
      price: price * 100,
      metrics: {
        costPerUnit: brandCostPerUnit,
        costProjection: brandCostProjection,
      },
    });
    user?.save();

    const brand = product?.brands[product?.brands.length - 1];

    return res.status(200).json(brand).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
