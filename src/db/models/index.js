import Product from "./product.js";
import Review from "./reviews.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

export { Product, Review };
