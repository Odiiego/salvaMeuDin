import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { router as listRouter } from "./routes/list";
import { router as productRouter } from "./routes/product";
import { router as brandRouter } from "./routes/brand";
import { router as authRouter } from "./routes/auth";
import { initializeGoogleStrategy } from "./auth/strategies/google";
import session from "express-session";
import passport from "passport";

const main = async () => {
  config();

  const app = express();
  app.use(
    session({
      secret: "cats",
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.json());
  await MongoClient.connect();
  initializeGoogleStrategy();

  app.use("/list", listRouter);
  app.use("/product", productRouter);
  app.use("/brand", brandRouter);
  app.use("/auth", authRouter);

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
