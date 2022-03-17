import express from "express";
import { Product, ProductCategory, User } from "../../db/models/index.js";
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

        //Pagination
        limit: req.query.limit, // number of records per page
        offset: parseInt(req.query.limit * req.query.page), // number f records skipped from 0
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })

  .post(async (req, res, next) => {
    try {
      console.log(req.body);

      const { categoryId, ...rest } = req.body;

      const product = await Product.create(rest);

      if (product) {
        // const dataToInsert = categoryId.map((id) => ({
        //   categoryId: id,
        //   productId: product.id,
        // }));
        const arrToInsert = []
        categoryId.forEach((id) => {
          const temp = { categoryId: id, productId: product.id }
          arrToInsert.push(temp)
        })

        const data = await ProductCategory.bulkCreate(arrToInsert); // [{categoryId:"jhghjgj", productId:"jhgjhfjh"}, ]
      }
      res.send("ok");
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

// Put requests require the categories in the array to work properly 
// {
//   "name": "Mirko",
//     "description" : "yepp",
//       "image": "www.whops.com",
//         "price": 69,
//           "categoryId": [1, 4]
// }

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findOne({
        include: [{ model: Review, include: User }, Category],
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
