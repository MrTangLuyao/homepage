/* schemas/c29_schema.js
 * Used by L29. */

LEARN.schema('sql:c29_schema', `
        CREATE TABLE students (id INTEGER, name TEXT, class TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice',  'A', 85);
        INSERT INTO students VALUES (2, 'Bob',    'A', 92);
        INSERT INTO students VALUES (3, 'Carol',  'A', 92);
        INSERT INTO students VALUES (4, 'David',  'B', 78);
        INSERT INTO students VALUES (5, 'Eve',    'B', 88);
        INSERT INTO students VALUES (6, 'Frank',  'B', 88);
        INSERT INTO students VALUES (7, 'Grace',  'C', 95);
      
`);
