# Storefront Backend Project
This Project is a Part of Udacity Full Stack Nanodegree

## Setting Up Project ##

# Postgres
Have Postgres Installed From
https://www.postgresql.org/download/

To Access Postgres, Open Terminal Type
psql -U postgres

note:
- you have to enter your superuser and postgres password
that you used during installation
- default port is 5432 if you changed it during installation
you need to change it in the .env file

You can Create a Database using following Command

CREATE DATABASE <db_name>;

Optional:
You can create another user or use postgres default user

CREATE USER <user_name> WITH PASSWORD '<password>';
GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <user_name>;

- Connect to the database

\c <db_name>

Display the tables (no relations should be found)

\dt

# Create .env File in Root Folder
NODE_ENV = dev
PORT = <main port on which the application will be running>
HOST = < where your database is hosted, use "localhost" if you are running your db locally >
BCRYPT_PW = <a pepper string for encryption>
SALT_ROUNDS = <salt rounds for bcrypt library>
SECRET_KEY = <a string for jwt secret> 
DB_NAME = <db_name>
DB_TEST = <db_name for testing purposes>
DB_USER = <name of database user>
DB_PW = <database user password>
DB_PORT = <databse port>

# Installing Dependencies
npm Install

- to run test environment
npm run run:test

- to run dev environment
npm run run:dev

- to reset test database
npm run reset:test

- to reset dev database
npm runreset:dev

- to run typescript watch
npm run watch

- to run tests
npm run test

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

# NOTE THERE IS A .rest File Included
# To Test Endpoints, You Can Download
# VsCode Rest Client and Use it instead
# When You Run The Tests A Token Will Be 
# logged You can use it in the file when required