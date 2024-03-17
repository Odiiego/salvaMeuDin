import express from "express";
import { config } from "dotenv";
import { GetListsController } from "./controllers/get-lists/get-lists";
import { MongoGetListsRepository } from "./repositories/get-lists/mongo-get-lists";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();
  await MongoClient.connect();

  app.get("/lists", async (req, res) => {
    const mongoGetListsRepository = new MongoGetListsRepository();
    const getListsController = new GetListsController(mongoGetListsRepository);
    const { body, statusCode } = await getListsController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
