import { Router } from "express";
import { Product, Reviews } from "../../db/models/index.js";
import { Op } from "sequelize";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const data = await Product.findAll({
      include: Reviews,
      // where: {
      //   [Op.or]: [
      //     {
      //       category: {
      //         [Op.in]: req.query.category.split(","),
      //       },
      //     },
      //     req.query.title && {
      //       title: {
      //         [Op.iLike]: `%${req.query.title}%`,
      //       },
      //     },
      //     req.query.content && {
      //       content: {
      //         [Op.iLike]: `%${req.query.content}%`,
      //       },
      //     },
      //   ],
      // },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
  }
});

productRouter.put("/:id", async (req, res, next) => {
  try {
    const result = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(result[1][0]);
  } catch (error) {
    console.log(error);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Product.destroy({ where: { id: req.params.id } });
    res.send({ rows });
  } catch (error) {
    console.log(error);
  }
});

export default productRouter;
