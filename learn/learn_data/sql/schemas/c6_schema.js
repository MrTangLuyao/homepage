/* schemas/c6_schema.js
 * Used by L6. */

LEARN.schema('sql:c6_schema', `
        CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
        INSERT INTO products VALUES (1, 'apple',  'fruit', 5);
        INSERT INTO products VALUES (2, 'bread',  'staple', 8);
        INSERT INTO products VALUES (3, 'milk',   'drink', 12);
        INSERT INTO products VALUES (4, 'banana', 'fruit', 4);
        INSERT INTO products VALUES (5, 'cola',   'drink', 6);
        INSERT INTO products VALUES (6, 'rice',   'staple', 20);
      
`);
