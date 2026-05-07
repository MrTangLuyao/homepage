/* schemas/c12_schema.js
 * Used by L12. */

LEARN.schema('sql:c12_schema', `
        CREATE TABLE products (id INTEGER, name TEXT, category TEXT);
        INSERT INTO products VALUES (1, 'apple',  'fruit');
        INSERT INTO products VALUES (2, 'bread',  'staple');
        INSERT INTO products VALUES (3, 'milk',   'drink');
        INSERT INTO products VALUES (4, 'banana', 'fruit');
        INSERT INTO products VALUES (5, 'cola',   'drink');
        INSERT INTO products VALUES (6, 'rice',   'staple');
        INSERT INTO products VALUES (7, 'mango',  'fruit');
      
`);
