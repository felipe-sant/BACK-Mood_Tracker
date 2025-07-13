CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL
);

INSERT INTO usuarios (nome) VALUES ('teste')