const { Product } = require("./../models/products");

const getAddProduct = (req, res, next) => {
  res.render("./admin/editProduct", {
    docTitle: "Add products",
    path: "/addProduct",
    docTitle: "Add products",
    edit: false,
  });
};

const postAddProduct = async (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const { _id: userId } = req.user;
  const prod = new Product(title, imageUrl, description, price, userId);
  prod.saveProduct();
  return res.redirect("/");
};

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const id = req.params.id;
  const productData = await Product.getProductById(id);
  if (!productData) {
    return res.redirect("/");
  }
  res.render("./admin/editProduct", {
    docTitle: "Add products",
    path: "/editProduct",
    docTitle: "Add products",
    prod: productData,
    edit: editMode,
  });
};

const postEditProduct = async (req, res, next) => {
  const { id, title, imageUrl, description, price } = req.body;
  const { _id: userId } = req.user;
  const prod = new Product(title, imageUrl, description, price, userId);
  await prod.updateProductById(id);
  res.redirect("/");
};

const postDeleteProduct = async (req, res, next) => {
  const { id } = req.body;
  await Product.deleteProductById(id);
  res.redirect("/");
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
