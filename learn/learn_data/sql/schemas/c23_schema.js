/* schemas/c23_schema.js
 * Used by L23. */

LEARN.schema('sql:c23_schema', `
        CREATE TABLE authors (id INTEGER, name TEXT);
        INSERT INTO authors VALUES (1, 'Herbert');
        INSERT INTO authors VALUES (2, 'Asimov');
        INSERT INTO authors VALUES (3, 'Le Guin');
        INSERT INTO authors VALUES (4, 'Pratchett');   -- no books
        INSERT INTO authors VALUES (5, 'Sanderson');   -- no books
        CREATE TABLE books (id INTEGER, title TEXT, author_id INTEGER);
        INSERT INTO books VALUES (1, 'Dune',       1);
        INSERT INTO books VALUES (2, 'Foundation', 2);
        INSERT INTO books VALUES (3, 'I, Robot',   2);
        INSERT INTO books VALUES (4, 'Earthsea',   3);
      
`);
