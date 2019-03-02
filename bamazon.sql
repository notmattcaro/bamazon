DROP DATABASE IF EXISTS bamazon; -- deletes database if exists

CREATE DATABASE bamazon; -- creates database

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) DEFAULT 'N/A', 
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

-- insert 10 different products as mock data
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('marvel lego hulkbuster', 'toys', 30, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('stuffed bear', 'toy', 20, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('kingdom hearts III', 'games', 60, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('super smash bros ultimate', 'games', 60, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('freshest shampoo', 'beauty', 5, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('jargon hand lotion', 'beauty', 4, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('pentel pencils', 'office', 2, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('notepads', 'office', 2, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('ultiflame grill', 'home', 300, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('supahot grill', 'home', 350, 2);