export type Order = {
  id: number;
  userId: number;
  status: string;
};

export type ProductIntoOrder = {
  id?: number;
  orderId: number;
  productId: number;
  qnty: number;
}