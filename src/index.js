import express from "express";
import sequelize, { testDB } from "./db/index.js";
import productsRouter from "./services/products/index.js";
import reviewsRouter from "./services/reviews/index.js";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);

server.listen(process.env.PORT || 3001, async () => {
  console.log("server is running on port ", process.env.PORT || 3001);
  await testDB();
  sequelize
    .sync()
    .then(() => {
      console.log("DB connected");
    })
    .catch((e) => {
      console.log(e);
    });
});
