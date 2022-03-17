import express from "express";
import { Product } from "../../db/models/index.js";
import sequelize from "sequelize";
const { Op } = sequelize;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: Review,

        where: {
          ...(req.query.search && {
            [Op.or]: [
              {
                name: {
                  [Op.iLike]: `%${req.query.search}%`,
                },
              },
              {
                description: {
                  [Op.iLike]: `%${req.query.search}%`,
                },
              },
            ],
          }),

          ...(req.query.price && {
            price: {
              [Op.between]: req.query.price.split(","),
            },
          }),
        },

        ...(req.query.order && { order: [req.query.order.split(",")] }),
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findOne({
        include: Review,
        where: {
          id: req.params.id,
        },
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });

      res.send(data[1][0]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const data = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.send({ rows: data });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

export default router;
