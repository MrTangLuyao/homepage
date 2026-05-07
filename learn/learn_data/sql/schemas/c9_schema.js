/* schemas/c9_schema.js
 * Used by L9. */

LEARN.schema('sql:c9_schema', `
        CREATE TABLE employees (id INTEGER, name TEXT, manager_id INTEGER);
        INSERT INTO employees VALUES (1, 'Zhang',  NULL);
        INSERT INTO employees VALUES (2, 'Li',     1);
        INSERT INTO employees VALUES (3, 'Wang',   2);
        INSERT INTO employees VALUES (4, 'Zhao',   3);
        INSERT INTO employees VALUES (5, 'Sun',    NULL);
      
`);
