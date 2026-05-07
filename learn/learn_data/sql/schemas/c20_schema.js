/* schemas/c20_schema.js
 * Used by L20, L22. */

LEARN.schema('sql:c20_schema', `
        CREATE TABLE orders (id INTEGER, customer TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'Anna', 24);
        INSERT INTO orders VALUES (2, 'Anna', 40);
        INSERT INTO orders VALUES (3, 'Ben',  10);
        INSERT INTO orders VALUES (4, 'Cara', 12);
        INSERT INTO orders VALUES (5, 'Anna', 18);
        INSERT INTO orders VALUES (6, 'Ben',  60);
        INSERT INTO orders VALUES (7, 'Dan',  500);
      
`);
