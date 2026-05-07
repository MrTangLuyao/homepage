/* schemas/c16_schema.js
 * Used by L16. */

LEARN.schema('sql:c16_schema', `
        CREATE TABLE customers (id INTEGER, name TEXT, country TEXT);
        INSERT INTO customers VALUES (1, 'Anna', 'AU');
        INSERT INTO customers VALUES (2, 'Ben',  'CN');
        INSERT INTO customers VALUES (3, 'Cara', 'US');
        CREATE TABLE products  (id INTEGER, name TEXT, price INTEGER);
        INSERT INTO products  VALUES (1, 'Pen',     5);
        INSERT INTO products  VALUES (2, 'Notebook', 12);
        INSERT INTO products  VALUES (3, 'Lamp',    40);
        CREATE TABLE orders   (id INTEGER, customer_id INTEGER, product_id INTEGER, total INTEGER);
        INSERT INTO orders    VALUES (1, 1, 2, 24);
        INSERT INTO orders    VALUES (2, 1, 3, 40);
        INSERT INTO orders    VALUES (3, 2, 1, 10);
        INSERT INTO orders    VALUES (4, 3, 2, 12);
      
`);
