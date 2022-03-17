import express from "express";
import { User } from "../../db/models/index.js";
import sequelize from "sequelize";
const { Op } = sequelize;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await User.findAll({});
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await User.create(req.body);
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
      const data = await User.findOne({
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
      const data = await User.update(req.body, {
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
      const data = await User.destroy({
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
