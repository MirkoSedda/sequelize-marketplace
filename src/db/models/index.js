import Product from "./product.js";
import Reviews from "./reviews.js";

Reviews.belongsTo(Product, { onDelete: "CASCADE" });
Product.hasMany(Reviews, { onDelete: "CASCADE" });

export { Product, Reviews };
