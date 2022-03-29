import express, { Application, Request, Response } from 'express';
import config from './config';
import { userRouter } from './routes/user_routes';
import { productsRouter } from './routes/product_routes';
import { ordersRouter } from './routes/order_routes';

const app: Application = express();

const port = config.PORT || 3000;
const address = `localhost:${port}`;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Index');
});
// routes
app.use('/', userRouter);
app.use('/', productsRouter);
app.use('/', ordersRouter);

app.listen(port, () => console.log(`Store Server Runing on: ${address}`));
console.log(config.NODE_ENV);

export default app;