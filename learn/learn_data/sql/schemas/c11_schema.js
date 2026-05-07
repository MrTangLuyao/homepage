/* schemas/c11_schema.js
 * Used by L11, L21. */

LEARN.schema('sql:c11_schema', `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 85);
        INSERT INTO students VALUES (2, 'Bob',   92);
        INSERT INTO students VALUES (3, 'Carol', 78);
        INSERT INTO students VALUES (4, 'David', 88);
        INSERT INTO students VALUES (5, 'Eve',   95);
        INSERT INTO students VALUES (6, 'Frank', 70);
      
`);
