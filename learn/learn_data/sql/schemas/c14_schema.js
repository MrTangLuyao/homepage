/* schemas/c14_schema.js
 * Used by L14. */

LEARN.schema('sql:c14_schema', `
        CREATE TABLE authors (id INTEGER, name TEXT, country TEXT);
        INSERT INTO authors VALUES (1, 'Herbert', 'US');
        INSERT INTO authors VALUES (2, 'Asimov',  'US');
        INSERT INTO authors VALUES (3, 'Gibson',  'CA');
        INSERT INTO authors VALUES (4, 'Le Guin', 'US');
        CREATE TABLE books (id INTEGER, title TEXT, author_id INTEGER, year INTEGER);
        INSERT INTO books VALUES (1, 'Dune',         1, 1965);
        INSERT INTO books VALUES (2, 'Foundation',   2, 1951);
        INSERT INTO books VALUES (3, 'I, Robot',     2, 1950);
        INSERT INTO books VALUES (4, 'Neuromancer',  3, 1984);
      
`);
