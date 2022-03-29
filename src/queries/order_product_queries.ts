export const orderProductQueries = {
  getAll: `SELECT * FROM order_product`,
  getOrderProductById: `SELECT * FROM order_product WHERE id=$1`,
  addProductToCart: `Insert INTO order_product (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`,
  removeProductFromCart: `DELETE FROM order_product WHERE order_id=$1 AND product_id=$2  RETURNING *`,
  updateQuantity: `UPDATE order_product SET quantity=$1 WHERE order_id=$2 and product_id=$3 RETURNING *`,
}