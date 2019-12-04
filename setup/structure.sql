CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(20) PRIMARY KEY,
    password VARCHAR(32) NOT NULL,
    profile_pic BYTEA
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL REFERENCES users(username),
    post BYTEA NOT NULL,
);
