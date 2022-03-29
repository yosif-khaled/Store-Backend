CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL,
    status VARCHAR NOT NULL
    );

-- dummy data for testing
-- INSERT INTO orders(status, user_id) VALUES ('open', 1);
-- INSERT INTO orders(status, user_id) VALUES ('open', 2);
-- INSERT INTO orders(status, user_id) VALUES ('open', 3);
-- INSERT INTO orders(status, user_id) VALUES ('open', 1);
-- INSERT INTO orders(status, user_id) VALUES ('open', 5);
-- INSERT INTO orders(status, user_id) VALUES ('open', 1);
-- INSERT INTO orders(status, user_id) VALUES ('closed', 4);