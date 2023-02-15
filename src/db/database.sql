CREATE DATABASE IF NOT EXISTS commercedb;

USE commercedb;

CREATE TABLE products (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    brand VARCHAR(45) NOT NULL,
    description VARCHAR(255) NOT NULL,
    tipe VARCHAR(45) NOT NULL,
    price INT(11) NOT NULL,
    PRIMARY KEY(id)
);

DESCRIBE productos;