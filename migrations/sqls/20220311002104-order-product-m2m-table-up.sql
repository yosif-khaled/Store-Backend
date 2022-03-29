CREATE TABLE IF NOT EXISTS order_product(
    id SERIAL PRIMARY KEY NOT NULL,
    order_id bigint REFERENCES orders(id) NOT NULL,
    quantity INT NOT NULL,
    product_id bigint REFERENCES products(pid) NOT NULL
);

-- kept the id to get current order although it is best to do it with date from my opinion
-- add dummy orders
-- INSERT INTO order_product (order_id, quantity, product_id) VALUES(1, 2, 1) RETURNING *;
-- INSERT INTO order_product (order_id, quantity, product_id) VALUES(4, 2, 1) RETURNING *;
-- INSERT INTO order_product (order_id, quantity, product_id) VALUES(4, 2, 2) RETURNING *;
-- INSERT INTO order_product (order_id, quantity, product_id) VALUES(4, 1, 2) RETURNING *;
-- INSERT INTO order_product (order_id, quantity, product_id) VALUES(4, 2, 3) RETURNING *;
-- INSERT INTO order_product (order_id, quantity, product_id) VALUES(4, 20, 4) RETURNING *;
-- INSERT INTO order_product (order_id, quantity, product_id) VALUES(4, 5, 4) RETURNING *;