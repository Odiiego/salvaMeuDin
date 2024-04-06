import express from "express";
import { MongoCreateBrandRepository } from "../repositories/brands/create-brand/mongo-create-brand";
import { CreateBrandController } from "../controllers/brands/create-brand/create-brand";
import { MongoUpdateBrandRepository } from "../repositories/brands/update-brand/mongo-update-brand";
import { UpdateBrandController } from "../controllers/brands/update-brand/update-brand";
import { MongoDeleteBrandRepository } from "../repositories/brands/delete-brand/mongo-delete-brand";
import { DeleteBrandController } from "../controllers/brands/delete-brand/delete-brand";

export const router = express.Router();

router.post("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const mongoUpdateBrandRepository = new MongoUpdateBrandRepository();
  const updateBrandController = new UpdateBrandController(
    mongoUpdateBrandRepository,
  );

  const { body, statusCode } = await updateBrandController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

router.delete("/:id", async (req, res) => {
  const mongoDeleteBrandRepository = new MongoDeleteBrandRepository();
  const deleteBrandController = new DeleteBrandController(
    mongoDeleteBrandRepository,
  );

  const { body, statusCode } = await deleteBrandController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});
