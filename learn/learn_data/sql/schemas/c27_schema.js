/* schemas/c27_schema.js
 * Used by L27. */

LEARN.schema('sql:c27_schema', `
        CREATE TABLE users (id INTEGER, name TEXT, email TEXT);
        INSERT INTO users VALUES (1, 'Anna', 'anna@x.com');
        INSERT INTO users VALUES (2, 'Ben',  'ben@x.com');
        INSERT INTO users VALUES (3, 'Cara', 'anna@x.com');
        INSERT INTO users VALUES (4, 'Dan',  'dan@x.com');
        INSERT INTO users VALUES (5, 'Eli',  'ben@x.com');
        INSERT INTO users VALUES (6, 'Fay',  'anna@x.com');
        INSERT INTO users VALUES (7, 'Gus',  'gus@x.com');
      
`);
