import { Router } from "express";
import { Reviews, Product } from "../../db/models/index.js";

const reviewRouter = Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const data = await Reviews.findAll({ include: Product });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Reviews.findByPk(req.params.id, { include: Product });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newReview = await Reviews.create(req.body);
    res.send(newReview);
  } catch (error) {
    console.log(error);
  }
});

reviewRouter.post("/:id", async (req, res, next) => {
  try {
    const newReview = await Reviews.create({
      ...req.body,
      productId: req.params.id,
    });
    res.send(newReview);
  } catch (error) {
    console.log(error);
  }
});

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await Reviews.destroy({ where: { id: req.params.id } });
    console.log(result);
    res.send({ result });
  } catch (error) {
    console.log(error);
  }
});

export default reviewRouter;
