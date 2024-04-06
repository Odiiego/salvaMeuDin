import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { router as listRouter } from "./routes/list";
import { router as productRouter } from "./routes/product";
import { router as brandRouter } from "./routes/brand";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());
  await MongoClient.connect();

  app.use("/list", listRouter);
  app.use("/product", productRouter);
  app.use("/brand", brandRouter);

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
