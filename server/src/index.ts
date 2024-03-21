import express from "express";
import { config } from "dotenv";
import { GetListsController } from "./controllers/get-lists/get-lists";
import { MongoGetListsRepository } from "./repositories/get-lists/mongo-get-lists";
import { MongoClient } from "./database/mongo";
import { MongoCreateListRepository } from "./repositories/create-list/mongo-create-list";
import { CreateListController } from "./controllers/create-list/create-list";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());
  await MongoClient.connect();

  app.get("/lists", async (req, res) => {
    const mongoGetListsRepository = new MongoGetListsRepository();
    const getListsController = new GetListsController(mongoGetListsRepository);
    const { body, statusCode } = await getListsController.handle();

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

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
