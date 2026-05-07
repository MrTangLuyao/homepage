/* schemas/c28_schema.js
 * Used by L28. */

LEARN.schema('sql:c28_schema', `
        CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
        INSERT INTO students VALUES (1, 'Alice',  92);
        INSERT INTO students VALUES (2, 'Bob',    88);
        INSERT INTO students VALUES (3, 'Carol',  85);
        INSERT INTO students VALUES (4, 'David',  85);
        INSERT INTO students VALUES (5, 'Eve',    78);
        INSERT INTO students VALUES (6, 'Frank',  92);
        INSERT INTO students VALUES (7, 'Grace',  70);
      
`);
