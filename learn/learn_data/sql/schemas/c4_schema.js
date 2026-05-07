/* schemas/c4_schema.js
 * Used by L4. */

LEARN.schema('sql:c4_schema', `
        CREATE TABLE events (id INTEGER, event TEXT, date TEXT);
        INSERT INTO events VALUES (1, 'signup',   '2024-01-15');
        INSERT INTO events VALUES (2, 'login',    '2024-03-20');
        INSERT INTO events VALUES (3, 'purchase', '2024-05-10');
        INSERT INTO events VALUES (4, 'refund',   '2024-07-01');
        INSERT INTO events VALUES (5, 'review',   '2024-09-12');
      
`);
