# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

# DATABASE SCHEMA

- USERS TABLE
    1. id
    2. first_name
    3. last_name
    4. email
    5. password

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    pw_digest VARCHAR NOT NULL
);

- PRODUCTS TABLE
    1. pid
    2. product_name
    3. price
    4. category -- optional -- can be left empty

CREATE TABLE IF NOT EXISTS products(
    pid SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR NOT NULL,
    price REAL NOT NULL,
    category VARCHAR NULL
);

- ORDERS TABLE
    1. id
    2. user_id -- Referenced from users
    3. status -- reprsents order status -- [ active , complete ]

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL,
    status VARCHAR NOT NULL
);

- ORDERS_PRODUCTS -- Contains The Relation Between Orders & Purchased Products
    1. id
    2. order_id -- Referenced from orders table
    3. quantity
    4. product_id -- Referenced from products table

CREATE TABLE IF NOT EXISTS order_product(
    id SERIAL PRIMARY KEY NOT NULL,
    order_id bigint REFERENCES orders(id) NOT NULL,
    quantity INT NOT NULL,
    product_id bigint REFERENCES products(pid) NOT NULL
);

# Routes

    NOTE: You will need a user token for all manipulating routes.

  - ROOT: GET '/'

  - Users:
    1. GET '/users' -- gets all users
    2. GET '/users:id' -- gets user by id
    3. POST '/users/register' -- creates new user
    4. POST '/users/login' -- logs in and authemnticates the user
    5. DELETE '/users' -- deletes user

  - Products:
    1. GET '/products' -- gets all products
    2. GET '/products/:id' -- gets product by id
    3. POST '/products' -- creates new product
    4. PATCH '/products' -- updates product info
    5. DELETE '/products' -- deletes product by id

  - Orders:
    1. GET '/orders' -- gets all orders
    2. GET '/:userId/orders' -- gets all orders for a certain user
    3. GET '/:userId/orders' -- gets most recent order
    4. GET '/:userId/orders/:orderId' -- gets order details for a certain user
    5. POST '/orders' -- adds a new product to a certain order
    6. POST '/:userId/orders' -- creates a new order for a user
    7. PATCH '/:userId/orders/:orderId/checkedout' -- changes order status from active to complete
    8. DELETE '/orders' -- deletes an order