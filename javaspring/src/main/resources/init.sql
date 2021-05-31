DROP TABLE IF EXISTS todos;
CREATE TABLE todos(id serial PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), priority INTEGER);
DROP SEQUENCE IF EXISTS hibernate_sequence_1;
CREATE SEQUENCE hibernate_sequence_1 START 1;

DROP TABLE IF EXISTS products;
CREATE TABLE products(id serial PRIMARY KEY, name VARCHAR(255), price INTEGER);
DROP SEQUENCE IF EXISTS hibernate_sequence_1;
CREATE SEQUENCE hibernate_sequence_1 START 1;

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(id serial PRIMARY KEY, datum DATE, product_id INTEGER, sum INTEGER);
DROP SEQUENCE IF EXISTS hibernate_sequence_2;
CREATE SEQUENCE hibernate_sequence_2 START 1;