import express from "express";
import { config } from "dotenv";
import { GetListsController } from "./controllers/lists/get-lists/get-lists";
import { MongoGetListsRepository } from "./repositories/lists/get-lists/mongo-get-lists";
import { MongoClient } from "./database/mongo";
import { MongoCreateListRepository } from "./repositories/lists/create-list/mongo-create-list";
import { CreateListController } from "./controllers/lists/create-list/create-list";
import { MongoUpdateListRepository } from "./repositories/lists/update-list/mongo-update-list";
import { UpdateListController } from "./controllers/lists/update-list/update-list";
import { MongoDeleteListRepository } from "./repositories/lists/delete-list/mongo-delete-list";
import { DeleteListController } from "./controllers/lists/delete-list/delete-list";
import { MongoCreateProductRepository } from "./repositories/products/create-product/mongo-create-product";
import { CreateProductController } from "./controllers/products/create-product/create-product";
import { MongoUpdateProductRepository } from "./repositories/products/update-product/mongo-update-product";
import { UpdateProductController } from "./controllers/products/update-product/update-product";
import { MongoDeleteProductRepository } from "./repositories/products/delete-product/mongo-delete-product";
import { DeleteProductController } from "./controllers/products/delete-product/delete-product";
import { MongoCreateBrandRepository } from "./repositories/brands/create-brand/mongo-create-brand";
import { CreateBrandController } from "./controllers/brands/create-brand/create-brand";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());
  await MongoClient.connect();

  app.get("/lists/:id?", async (req, res) => {
    const mongoGetListsRepository = new MongoGetListsRepository();
    const getListsController = new GetListsController(mongoGetListsRepository);
    const { body, statusCode } = await getListsController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.post("/lists", async (req, res) => {
    const mongoCreateListRepository = new MongoCreateListRepository();
    const createListController = new CreateListController(
      mongoCreateListRepository,
    );

    const { body, statusCode } = await createListController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.put("/lists/:id", async (req, res) => {
    const mongoUpdateListRepository = new MongoUpdateListRepository();
    const updateListController = new UpdateListController(
      mongoUpdateListRepository,
    );

    const { body, statusCode } = await updateListController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/lists/:id", async (req, res) => {
    const mongoDeleteListRepository = new MongoDeleteListRepository();
    const deleteListController = new DeleteListController(
      mongoDeleteListRepository,
    );

    const { body, statusCode } = await deleteListController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.post("/lists/:id/product", async (req, res) => {
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

  app.put("/lists/:listId/product/:productId", async (req, res) => {
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

  app.delete("/lists/:ListId/product/:productId", async (req, res) => {
    const mongoDeleteProductRepository = new MongoDeleteProductRepository();
    const deleteProductController = new DeleteProductController(
      mongoDeleteProductRepository,
    );

    const { body, statusCode } = await deleteProductController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.post("/lists/product/:id", async (req, res) => {
    const mongoCreateBrandRepository = new MongoCreateBrandRepository();
    const createBrandController = new CreateBrandController(
      mongoCreateBrandRepository,
    );

    const { body, statusCode } = await createBrandController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
