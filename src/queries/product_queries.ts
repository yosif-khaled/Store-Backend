export const productQueries = {
  getAllProducts: `SELECT * FROM products`,
  getProductById: `SELECT * FROM products WHERE pid = $1`,
  createProduct: `INSERT INTO products(product_name, price, category)
  VALUES ($1, $2, $3) RETURNING *`,
  updateProduct: `UPDATE products SET product_name = $1, price = $2, category = $3 where pid = $4 RETURNING *`,
  deleteProduct: `DELETE FROM products WHERE pid=$1 RETURNING *`
};