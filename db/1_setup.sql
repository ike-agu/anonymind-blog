DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
  id serial PRIMARY KEY,
  title varchar(100) NOT NULL,
  content varchar(500) NOT NULL
  user_id int
);
