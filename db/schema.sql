CREATE TABLE users(
          id INTEGER PRIMARY KEY,
          username TEXT UNIQUE,
          password TEXT,
          board TEXT,
          boxIdx TEXT,
          wins INTEGER,
          losses INTEGER,
          ties INTEGER
);