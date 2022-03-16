import express from "express";
import cors from "cors";
import { testDB, syncDB } from "./db/index.js";
import productRouter from "./services/product/index.js";
import reviewRouter from "./services/reviews/index.js";

// {
//   "id": "16194c21-507a-41cd-b68c-4326d482a6fa",
//     "name": "ALIIII",
//       "category": "Fratello",
//         "description": "HE WANTS TO FUCK UP EVERYONE WHO LIKES SQL",
//           "image": "url(IMAGE LINK)",
//             "price": 99,
//               "createdAt": "2022-03-16T14:46:41.617Z",
//                 "updatedAt": "2022-03-16T14:47:59.622Z",
//                   "productId": null
// }

const server = express();

server.use(express.json());

server.use(cors());

server.use("/product", productRouter);
server.use("/reviews", reviewRouter);

const { PORT = 3001 } = process.env;

const initialize = async () => {
  try {
    server.listen(PORT, async () => {
      await testDB();
      await syncDB();

      console.log("✅ Server is listening on port " + PORT);
    });

    server.on("error", (error) => {
      console.log("❌ Server is not running due to error : " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initialize();
