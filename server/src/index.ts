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

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
