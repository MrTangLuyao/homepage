/* schemas/c1_schema.js
 * Used by L1. */

LEARN.schema('sql:c1_schema', `
        CREATE TABLE students (id INTEGER, name TEXT, age INTEGER, gender TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice', 18, 'F', 85);
        INSERT INTO students VALUES (2, 'Bob',   19, 'M', 92);
        INSERT INTO students VALUES (3, 'Carol', 20, 'F', 78);
        INSERT INTO students VALUES (4, 'David', 18, 'M', 88);
      
`);
