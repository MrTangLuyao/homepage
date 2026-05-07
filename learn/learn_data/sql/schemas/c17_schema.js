/* schemas/c17_schema.js
 * Used by L17. */

LEARN.schema('sql:c17_schema', `
        CREATE TABLE users (id INTEGER, name TEXT, email TEXT, city TEXT);
        INSERT INTO users VALUES (1, 'Anna', 'a@x.com', 'Sydney');
        INSERT INTO users VALUES (2, 'Ben',  NULL,      'Sydney');
        INSERT INTO users VALUES (3, 'Cara', 'c@x.com', 'Beijing');
        INSERT INTO users VALUES (4, 'Dan',  'd@x.com', 'Beijing');
        INSERT INTO users VALUES (5, 'Ева',  NULL,      'Moscow');
      
`);
