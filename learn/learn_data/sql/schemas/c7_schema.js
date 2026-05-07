/* schemas/c7_schema.js
 * Used by L7. */

LEARN.schema('sql:c7_schema', `
        CREATE TABLE orders (id INTEGER, product TEXT, order_date TEXT, total INTEGER);
        INSERT INTO orders VALUES (1, 'apple',  '2024-03-15', 30);
        INSERT INTO orders VALUES (2, 'orange', '2024-04-20', 45);
        INSERT INTO orders VALUES (3, 'banana', '2024-05-10', 25);
        INSERT INTO orders VALUES (4, 'grape',  '2024-06-05', 60);
        INSERT INTO orders VALUES (5, 'mango',  '2024-08-01', 80);
        INSERT INTO orders VALUES (6, 'lemon',  '2024-02-08', 18);
      
`);
