/* schemas/c2_schema.js
 * Used by L2. */

LEARN.schema('sql:c2_schema', `
        CREATE TABLE books (id INTEGER, title TEXT, author TEXT, year INTEGER, price INTEGER);
        INSERT INTO books VALUES (1, 'Dune',         'Herbert',  1965, 42);
        INSERT INTO books VALUES (2, 'Foundation',   'Asimov',   1951, 35);
        INSERT INTO books VALUES (3, 'Neuromancer',  'Gibson',   1984, 28);
        INSERT INTO books VALUES (4, 'Hyperion',     'Simmons',  1989, 38);
      
`);
