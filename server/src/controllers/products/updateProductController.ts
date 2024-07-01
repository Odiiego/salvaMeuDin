import express from 'express';
import { getPathToProduct } from './helpers';
import { getUserById } from '../users/helpers';

export const updateProductController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const { userId, listId } = await getPathToProduct(id);

    const user = await getUserById(userId);
    const list = user?.lists.id(listId);
    const product = list?.content.id(id);
    if (!product) return res.sendStatus(400);
    if (product.quantity !== quantity && product.brands.length > 0) {
      const metrics = {
        costProjection: { quantity: 0, value: 0 },
        costPerUnit: { quantity: 0, value: 0 },
      };

      product.brands.map((brand) => {
        const costProjection =
          Math.ceil(quantity / brand.quantity!) * brand.price!;

        if (!brand.metrics) return;
        brand.metrics.costProjection = costProjection;

        metrics.costPerUnit = {
          quantity:
            !metrics.costPerUnit.value ||
            metrics.costPerUnit.value / metrics.costPerUnit.quantity >
              brand.metrics.costPerUnit!
              ? brand.quantity!
              : metrics.costPerUnit.quantity,
          value:
            !metrics.costPerUnit.value ||
            metrics.costPerUnit.value / metrics.costPerUnit.quantity >
              brand.metrics.costPerUnit!
              ? brand.metrics.costProjection!
              : metrics.costPerUnit.value,
        };

        metrics.costProjection = {
          quantity:
            !metrics.costProjection.value ||
            metrics.costProjection.value > costProjection
              ? brand.quantity!
              : metrics.costProjection.quantity,
          value:
            !metrics.costProjection.value ||
            metrics.costProjection.value > costProjection
              ? costProjection
              : metrics.costProjection.value,
        };
      });

      if (!product.bestMetrics) return;
      product.bestMetrics = metrics;
    }

    product.name = name ? name : product.name;
    product.quantity = quantity || quantity === 0 ? quantity : product.quantity;
    user?.save();

    return res.status(200).json(product).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
