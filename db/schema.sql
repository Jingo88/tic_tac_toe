CREATE TABLE users(
          id INTEGER PRIMARY KEY,
          username TEXT UNIQUE,
          password TEXT
);

CREATE TABLE games(
          id INTEGER PRIMARY KEY,
          board TEXT,
          user_id INTEGER REFERENCES users
);
