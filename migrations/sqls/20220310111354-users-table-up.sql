CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY NOT NULL,
first_name VARCHAR NOT NULL,
last_name VARCHAR NOT NULL,
email VARCHAR UNIQUE,
pw_digest VARCHAR NOT NULL
);

-- dummy userdata for testing
-- INSERT INTO users(first_name, last_name, email, pw_digest)
-- VALUES ('joe', 'killer', 'j@gmail.com', 'test');

-- INSERT INTO users(first_name, last_name,  email, pw_digest)
-- VALUES ('aya', 'amr', 'a@gmail.com', 'love');

-- INSERT INTO users(first_name, last_name, email, pw_digest)
-- VALUES ('eslam', 'moussa', 'm@gmail.com', 'friend');

-- INSERT INTO users(first_name, last_name, email, pw_digest)
-- VALUES ('amr', 'samy', 's@gmail.com', 'test1');

-- INSERT INTO users(first_name, last_name,  email, pw_digest)
-- VALUES ('ahmed', 'fouad', 'f@gmail.com', 'test2');

-- INSERT INTO users(first_name, last_name, email, pw_digest)
-- VALUES ('mohammed', 'saad', 'ms@gmail.com', 'test3');
