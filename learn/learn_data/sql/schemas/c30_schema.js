/* schemas/c30_schema.js
 * Used by L30. */

LEARN.schema('sql:c30_schema', `
        CREATE TABLE orders (id INTEGER, customer TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'Anna',  100);
        INSERT INTO orders VALUES (2, 'Anna',  200);
        INSERT INTO orders VALUES (3, 'Ben',   150);
        INSERT INTO orders VALUES (4, 'Cara',   50);
        INSERT INTO orders VALUES (5, 'Anna',  100);
        INSERT INTO orders VALUES (6, 'Ben',   200);
        INSERT INTO orders VALUES (7, 'Cara',  200);
      
`);
