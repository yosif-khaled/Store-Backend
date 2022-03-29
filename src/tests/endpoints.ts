// Created This File Solely for Testing
export const endPoints = {
  root: '/',
  getAllUsers: '/users',
  getUserbyId: '/users/:id',
  createNewUser: '/users/register',
  deleteUser: '/users',

  getAllProducts: '/products',
  getProductById: '/products/:id',
  createNewProduct: '/products',
  updateProduct: '/products',
  deleteProductById: '/products',
  
  getAllOrders: '/orders',
  getAllOrdersByUserId: '/:userId/orders',
  getMostRecentOrderByUserId: '/:userId/orders',
  getOrder: '/:userId/orders/:orderId',
  addProductToOrder: '/orders',
  createNewOrder: '/:userId/orders',
  closeOrder: '/:userId/orders/:orderId/checkedout',
  deleteOrder: '/orders'
};