/* schemas/c31_schema.js
 * Used by L31. */

LEARN.schema('sql:c31_schema', `
        CREATE TABLE products (id INTEGER, name TEXT, sales INTEGER, returns INTEGER);
        INSERT INTO products VALUES (1, 'Pen',       100, 5);
        INSERT INTO products VALUES (2, 'Notebook', 200, 30);
        INSERT INTO products VALUES (3, 'Lamp',       0, 0);
        INSERT INTO products VALUES (4, 'Mug',       50, 10);
        INSERT INTO products VALUES (5, 'Eraser',     0, 2);
      
`);
