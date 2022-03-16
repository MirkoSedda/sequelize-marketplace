import Product from "./product.js";
import Reviews from "./reviews.js";

Product.belongsTo(Reviews, { onDelete: "CASCADE" });
Reviews.hasMany(Product, { onDelete: "CASCADE" });

export { Product, Reviews };
