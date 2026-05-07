/* schemas/c24_schema.js
 * Used by L24. */

LEARN.schema('sql:c24_schema', `
        CREATE TABLE sales (id INTEGER, name TEXT, price INTEGER, discount INTEGER);
        INSERT INTO sales VALUES (1, 'Pen',      10, 2);
        INSERT INTO sales VALUES (2, 'Notebook', 25, NULL);
        INSERT INTO sales VALUES (3, 'Lamp',     50, 8);
        INSERT INTO sales VALUES (4, 'Mug',      15, NULL);
      
`);
