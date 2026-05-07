/* schemas/c8_schema.js
 * Used by L8. */

LEARN.schema('sql:c8_schema', `
        CREATE TABLE books (id INTEGER, title TEXT);
        INSERT INTO books VALUES (1, 'SQL Cookbook');
        INSERT INTO books VALUES (2, 'Python Crash Course');
        INSERT INTO books VALUES (3, 'Machine Learning Yearning');
        INSERT INTO books VALUES (4, 'Advanced SQL Patterns');
        INSERT INTO books VALUES (5, 'Effective Java');
        INSERT INTO books VALUES (6, 'SQL Antipatterns');
      
`);
