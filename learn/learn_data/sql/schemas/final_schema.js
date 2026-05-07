/* schemas/final_schema.js
 * Used by L33, L34, L35, L36, L37, L38, L39, L40, L41, L42. */

LEARN.schema('sql:final_schema', `
  CREATE TABLE branches (id INTEGER, name TEXT, city TEXT, opened_date TEXT);
  INSERT INTO branches VALUES (1, 'Central',      'Sydney',   '2010-01-01');
  INSERT INTO branches VALUES (2, 'North',        'Sydney',   '2015-06-15');
  INSERT INTO branches VALUES (3, 'Beijing-East', 'Beijing',  '2018-09-01');
  INSERT INTO branches VALUES (4, 'NYC-West',     'New York', '2020-03-15');
  INSERT INTO branches VALUES (5, 'Newtown',      'Sydney',   '2024-11-01');

  CREATE TABLE members (id INTEGER, name TEXT, country TEXT, joined_date TEXT);
  INSERT INTO members VALUES (1, 'Anna', 'AU', '2023-01-15');
  INSERT INTO members VALUES (2, 'Ben',  'CN', '2023-03-20');
  INSERT INTO members VALUES (3, 'Cara', 'US', '2024-02-10');
  INSERT INTO members VALUES (4, 'Dan',  'AU', '2024-06-05');
  INSERT INTO members VALUES (5, 'Eli',  'CN', '2025-01-12');
  INSERT INTO members VALUES (6, 'Fay',  'US', '2025-04-22');
  INSERT INTO members VALUES (7, 'Gus',  'AU', '2025-09-01');
  INSERT INTO members VALUES (8, 'Hua',  'CN', '2026-02-15');

  CREATE TABLE memberships (id INTEGER, member_id INTEGER, plan TEXT, start_date TEXT, end_date TEXT, monthly_fee INTEGER);
  INSERT INTO memberships VALUES (1, 1, 'premium', '2023-01-15',  NULL,         15);
  INSERT INTO memberships VALUES (2, 2, 'basic',   '2023-03-20', '2024-03-20',   5);
  INSERT INTO memberships VALUES (3, 3, 'premium', '2024-02-10', '2026-02-10',  15);
  INSERT INTO memberships VALUES (4, 4, 'basic',   '2024-06-05', '2027-06-05',   5);
  INSERT INTO memberships VALUES (5, 5, 'premium', '2025-01-12',  NULL,         15);
  INSERT INTO memberships VALUES (6, 6, 'basic',   '2025-04-22', '2025-10-22',   5);

  CREATE TABLE authors (id INTEGER, name TEXT, nationality TEXT);
  INSERT INTO authors VALUES (1, 'Smith',  'UK');
  INSERT INTO authors VALUES (2, 'Lee',    'US');
  INSERT INTO authors VALUES (3, 'Tanaka', 'Japan');
  INSERT INTO authors VALUES (4, 'Patel',  'India');
  INSERT INTO authors VALUES (5, 'Rivera', 'Mexico');
  INSERT INTO authors VALUES (6, 'Chen',   'China');
  INSERT INTO authors VALUES (7, 'Brown',  'UK');
  INSERT INTO authors VALUES (8, 'Garcia', 'Spain');

  CREATE TABLE books (id INTEGER, title TEXT, author_id INTEGER, genre TEXT, published_year INTEGER);
  INSERT INTO books VALUES ( 1, 'Alpha',   1, 'Mystery',  2010);
  INSERT INTO books VALUES ( 2, 'Beta',    1, 'Mystery',  2014);
  INSERT INTO books VALUES ( 3, 'Gamma',   2, 'SciFi',    2018);
  INSERT INTO books VALUES ( 4, 'Delta',   2, 'SciFi',    2022);
  INSERT INTO books VALUES ( 5, 'Epsilon', 2, 'Thriller', 2020);
  INSERT INTO books VALUES ( 6, 'Zeta',    3, 'Mystery',  2017);
  INSERT INTO books VALUES ( 7, 'Eta',     3, 'Romance',  2019);
  INSERT INTO books VALUES ( 8, 'Theta',   4, 'SciFi',    2021);
  INSERT INTO books VALUES ( 9, 'Iota',    5, 'Thriller', 2015);
  INSERT INTO books VALUES (10, 'Kappa',   6, 'Mystery',  2023);
  INSERT INTO books VALUES (11, 'Lambda',  6, 'Mystery',  2024);
  INSERT INTO books VALUES (12, 'Mu',      7, 'Romance',  2016);

  CREATE TABLE copies (id INTEGER, book_id INTEGER, branch_id INTEGER);
  INSERT INTO copies VALUES ( 1,  1, 1);
  INSERT INTO copies VALUES ( 2,  3, 1);
  INSERT INTO copies VALUES ( 3,  5, 1);
  INSERT INTO copies VALUES ( 4,  7, 1);
  INSERT INTO copies VALUES ( 5,  9, 1);
  INSERT INTO copies VALUES ( 6,  2, 2);
  INSERT INTO copies VALUES ( 7,  4, 2);
  INSERT INTO copies VALUES ( 8,  6, 2);
  INSERT INTO copies VALUES ( 9,  8, 2);
  INSERT INTO copies VALUES (10, 10, 2);
  INSERT INTO copies VALUES (11,  1, 3);
  INSERT INTO copies VALUES (12,  6, 3);
  INSERT INTO copies VALUES (13, 11, 3);
  INSERT INTO copies VALUES (14, 12, 3);
  INSERT INTO copies VALUES (15,  2, 4);
  INSERT INTO copies VALUES (16,  4, 4);
  INSERT INTO copies VALUES (17,  5, 4);
  INSERT INTO copies VALUES (18, 10, 4);

  CREATE TABLE loans (id INTEGER, member_id INTEGER, copy_id INTEGER, loan_date TEXT, return_date TEXT, fine INTEGER);
  INSERT INTO loans VALUES ( 1, 1,  1, '2025-03-10', '2025-03-25',    0);
  INSERT INTO loans VALUES ( 2, 1,  2, '2025-04-01', '2025-04-15',    0);
  INSERT INTO loans VALUES ( 3, 1,  6, '2025-05-12', '2025-05-30',    5);
  INSERT INTO loans VALUES ( 4, 1, 11, '2025-08-20', '2025-09-05',    0);
  INSERT INTO loans VALUES ( 5, 1, 17, '2026-01-10',  NULL,         NULL);
  INSERT INTO loans VALUES ( 6, 1,  8, '2025-10-15', '2025-11-01',    0);
  INSERT INTO loans VALUES ( 7, 1, 13, '2025-11-15', '2025-12-01',    0);

  INSERT INTO loans VALUES ( 8, 2,  1, '2025-06-05', '2025-06-25',    0);
  INSERT INTO loans VALUES ( 9, 2,  3, '2025-07-12', '2025-07-30',    0);
  INSERT INTO loans VALUES (10, 2, 12, '2026-01-05',  NULL,         NULL);
  INSERT INTO loans VALUES (11, 2, 13, '2026-02-15',  NULL,         NULL);

  INSERT INTO loans VALUES (12, 3,  4, '2025-09-01', '2025-09-20',   10);
  INSERT INTO loans VALUES (13, 3, 10, '2025-10-12', '2025-11-05',    5);
  INSERT INTO loans VALUES (14, 3, 16, '2025-12-01', '2025-12-20',    0);

  INSERT INTO loans VALUES (15, 4,  5, '2025-04-15', '2025-05-02',    0);
  INSERT INTO loans VALUES (16, 4,  7, '2025-06-10', '2025-06-25',    0);
  INSERT INTO loans VALUES (17, 4,  9, '2025-08-05', '2025-08-22',    0);
  INSERT INTO loans VALUES (18, 4, 14, '2025-10-15', '2025-11-01',    0);
  INSERT INTO loans VALUES (19, 4, 18, '2026-02-01',  NULL,         NULL);
  INSERT INTO loans VALUES (20, 4,  1, '2024-12-01', '2024-12-20',    0);
  INSERT INTO loans VALUES (21, 4,  6, '2025-01-15', '2025-02-01',    0);
  INSERT INTO loans VALUES (22, 4, 12, '2025-09-25', '2025-10-12',    0);
  INSERT INTO loans VALUES (23, 4, 13, '2025-11-15', '2025-12-01',    0);

  INSERT INTO loans VALUES (24, 5,  8, '2025-09-10', '2025-09-30',    0);
  INSERT INTO loans VALUES (25, 5, 11, '2025-11-15', '2025-12-05',    0);
  INSERT INTO loans VALUES (26, 5, 15, '2026-01-20',  NULL,         NULL);
  INSERT INTO loans VALUES (27, 5, 10, '2025-09-15', '2025-10-01',    0);

  INSERT INTO loans VALUES (28, 6,  6, '2025-07-08', '2025-07-25',    0);
  INSERT INTO loans VALUES (29, 6, 16, '2025-12-10',  NULL,         NULL);

  CREATE TABLE reviews (id INTEGER, member_id INTEGER, book_id INTEGER, rating INTEGER, created_at TEXT);
  INSERT INTO reviews VALUES ( 1, 1,  1, 5, '2025-03-26');
  INSERT INTO reviews VALUES ( 2, 1,  3, 4, '2025-04-16');
  INSERT INTO reviews VALUES ( 3, 1,  2, 3, '2025-05-31');
  INSERT INTO reviews VALUES ( 4, 1,  5, 5, '2026-02-15');
  INSERT INTO reviews VALUES ( 5, 1,  6, 5, '2025-11-02');
  INSERT INTO reviews VALUES ( 6, 1, 11, 4, '2025-12-15');

  INSERT INTO reviews VALUES ( 7, 2,  1, 4, '2025-06-26');
  INSERT INTO reviews VALUES ( 8, 2,  5, 5, '2025-07-31');

  INSERT INTO reviews VALUES ( 9, 3,  7, 4, '2025-09-21');
  INSERT INTO reviews VALUES (10, 3, 10, 3, '2025-11-06');
  INSERT INTO reviews VALUES (11, 3,  4, 4, '2025-12-21');

  INSERT INTO reviews VALUES (12, 4,  9, 4, '2025-05-03');
  INSERT INTO reviews VALUES (13, 4,  4, 4, '2025-06-26');

  INSERT INTO reviews VALUES (14, 5,  6, 4, '2025-10-01');
  INSERT INTO reviews VALUES (15, 5,  1, 5, '2025-12-06');

  INSERT INTO reviews VALUES (16, 6,  2, 4, '2025-07-26');
`);
