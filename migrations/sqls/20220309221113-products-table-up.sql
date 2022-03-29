CREATE TABLE IF NOT EXISTS products(
pid SERIAL PRIMARY KEY NOT NULL,
product_name VARCHAR NOT NULL,
price REAL NOT NULL,
category VARCHAR NULL
);
-- dummy data for quick testing
-- INSERT INTO products(product_name, price)
-- VALUES ('elden ring', 950);

-- INSERT INTO products(product_name, price)
-- VALUES ('horizon', 1200);

-- INSERT INTO products(product_name, price)
-- VALUES ('spiderman', 450);

-- INSERT INTO products(product_name, price)
-- VALUES ('aot2', 1450);

-- INSERT INTO products(product_name, price)
-- VALUES ('bloodborne', 450);