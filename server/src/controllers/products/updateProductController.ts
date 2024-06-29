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
    if (product.quantity !== quantity) {
      let bestCostProjection = { quantity: 0, value: 0 };

      product.brands.map((brand) => {
        const costProjection =
          Math.ceil(quantity / brand.quantity!) * brand.price!;

        if (!brand.metrics) return;
        brand.metrics.costProjection = costProjection;

        bestCostProjection = {
          quantity:
            !bestCostProjection.quantity ||
            bestCostProjection.quantity > costProjection
              ? brand.quantity!
              : bestCostProjection.quantity,
          value:
            !bestCostProjection.value ||
            bestCostProjection.value > costProjection
              ? costProjection
              : bestCostProjection.value,
        };
      });

      if (!product.bestMetrics) return;
      product.bestMetrics.costProjection = bestCostProjection;
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
