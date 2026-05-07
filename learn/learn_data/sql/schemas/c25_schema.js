/* schemas/c25_schema.js
 * Used by L25. */

LEARN.schema('sql:c25_schema', `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 92);
        INSERT INTO students VALUES (2, 'Bob',   85);
        INSERT INTO students VALUES (3, 'Carol', 78);
        INSERT INTO students VALUES (4, 'David', 67);
        INSERT INTO students VALUES (5, 'Eve',   95);
        INSERT INTO students VALUES (6, 'Frank', 55);
      
`);
