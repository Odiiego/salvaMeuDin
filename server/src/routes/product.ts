import express from "express";
import { MongoCreateProductRepository } from "../repositories/products/create-product/mongo-create-product";
import { CreateProductController } from "../controllers/products/create-product/create-product";
import { MongoUpdateProductRepository } from "../repositories/products/update-product/mongo-update-product";
import { UpdateProductController } from "../controllers/products/update-product/update-product";
import { MongoDeleteProductRepository } from "../repositories/products/delete-product/mongo-delete-product";
import { DeleteProductController } from "../controllers/products/delete-product/delete-product";

export const router = express.Router();

router.post("/product/:id", async (req, res) => {
  const mongoCreateProductRepository = new MongoCreateProductRepository();
  const createProductController = new CreateProductController(
    mongoCreateProductRepository,
  );

  const { body, statusCode } = await createProductController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

router.put("/product/:id", async (req, res) => {
  const mongoUpdateProductRepository = new MongoUpdateProductRepository();
  const updateProductController = new UpdateProductController(
    mongoUpdateProductRepository,
  );

  const { body, statusCode } = await updateProductController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

router.delete("/product/:id", async (req, res) => {
  const mongoDeleteProductRepository = new MongoDeleteProductRepository();
  const deleteProductController = new DeleteProductController(
    mongoDeleteProductRepository,
  );

  const { body, statusCode } = await deleteProductController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});
