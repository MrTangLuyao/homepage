/* schemas/c13_schema.js
 * Used by L13. */

LEARN.schema('sql:c13_schema', `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 85);
        INSERT INTO students VALUES (2, 'Bob',   92);
        INSERT INTO students VALUES (3, 'Carol', 78);
        INSERT INTO students VALUES (4, 'David', 88);
      
`);
