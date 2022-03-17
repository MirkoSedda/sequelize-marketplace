import Product from "./product.js";
import Review from "./reviews.js";
import Category from "./category.js";
import User from "./user.js";
import ProductCategory from "./productCategory.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

Category.belongsToMany(Product, {
  through: ProductCategory,
  onDelete: "CASCADE",
});
Product.belongsToMany(Category, {
  through: ProductCategory,
  onDelete: "CASCADE",
});

export { Product, Review, Category, User, ProductCategory };
