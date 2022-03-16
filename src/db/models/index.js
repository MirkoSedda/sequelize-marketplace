import Product from "./product.js";
import Reviews from "./reviews.js";

//defining relationship
// 1. what methods to use? hasMany, belongsTo
// 2. pick method and undersatnd TRAGET & SOURCE model
// 3. on the the other method switch TARGET & SOURCE model

Product.belongsTo(Product, { onDelete: "CASCADE" }); // allows to include User on Article
Reviews.hasMany(Reviews, { onDelete: "CASCADE" }); // allows to include Article in User

export { Product, Reviews };
