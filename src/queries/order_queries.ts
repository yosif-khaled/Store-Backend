export const orderQueries = {
  getAllOrders: `SELECT * FROM orders`,
  getAllOrdersByUserId: `SELECT * FROM orders where user_id = $1`,
  getOrder: `SELECT orders.user_id, users.email, orders.id, products.product_name, order_product.quantity, products.price
  FROM orders
  INNER JOIN users ON users.id = orders.user_id
  INNER JOIN order_product ON orders.id = order_product.order_id
  INNER JOIN products ON products.pid = order_product.product_id
  WHERE user_id=$1 AND order_id=$2 AND status='open'
  `,
  getMostRecentOrderByUserId: 'SELECT * FROM orders WHERE user_id=$1 ORDER BY id DESC LIMIT 1',
  createNewOrder: `INSERT INTO orders(user_id, status) VALUES ($1, $2) RETURNING *`,
  closeOrder: `UPDATE orders SET status=$1 WHERE id=$2 AND user_id=$3 RETURNING *`,
  deleteOrder: `DELETE FROM orders where id=$1 RETURNING *`,
  addProductToCart: `Insert INTO order_product (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`,
};