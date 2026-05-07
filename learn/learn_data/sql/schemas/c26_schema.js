/* schemas/c26_schema.js
 * Used by L26. */

LEARN.schema('sql:c26_schema', `
        CREATE TABLE orders (id INTEGER, customer TEXT, country TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'Anna', 'AU', 24);
        INSERT INTO orders VALUES (2, 'Anna', 'AU', 40);
        INSERT INTO orders VALUES (3, 'Ben',  'CN', 10);
        INSERT INTO orders VALUES (4, 'Cara', 'US', 12);
        INSERT INTO orders VALUES (5, 'Anna', 'AU', 18);
        INSERT INTO orders VALUES (6, 'Ben',  'CN', 60);
        INSERT INTO orders VALUES (7, 'Dan',  'CN', 500);
        INSERT INTO orders VALUES (8, 'Cara', 'US', 250);
        INSERT INTO orders VALUES (9, 'Eli',  'AU', 5);
      
`);
