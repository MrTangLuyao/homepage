/* schemas/c32_schema.js
 * Used by L32. */

LEARN.schema('sql:c32_schema', `
        CREATE TABLE employees (id INTEGER, name TEXT, salary INTEGER);
        INSERT INTO employees VALUES (1, 'Anna',  9000);
        INSERT INTO employees VALUES (2, 'Ben',   7500);
        INSERT INTO employees VALUES (3, 'Cara',  9000);
        INSERT INTO employees VALUES (4, 'Dan',   8200);
        INSERT INTO employees VALUES (5, 'Eli',   7500);
        INSERT INTO employees VALUES (6, 'Fay',   6800);
      
`);
