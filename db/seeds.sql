-- Insert Items into table for testing --
INSERT INTO department (name)
VALUES ('Upper Management'),
       ('Pretty Girl Department'),
       ('Engineering'),
       ('Sales'),
       ('Finance'),
       ('Legal'),
       ('Awesome Department');

INSERT INTO role (title, salary, departments)
VALUES ('CEO', 185000, 1),
       ('Resident Beautiful Girl', 9999999999, 2),
       ('Lead Software Engineer', 145000, 3),
       ('Software Engineer', 86000, 3),
       ('Salesperson', 88000, 4),
       ('Accountant Manager', 126000, 5),
       ('Accountant', 98000, 5),
       ('Legal Team Lead', 215000, 6),
       ('Lawyer', 110000, 6),
       ('Book Keeper', 98000, 5),
       ('Resident Awesome Guy', 999888, 7);


-- Managers: Joshua Pruitt: 1, Seth Jaeger: 6, Alison Pruitt: 11, William Pruitt: 12,  
-- have a default value at zero so that team members 
INSERT INTO employee (id, first_name)
VALUES (0, 'NULL');


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Joshua', 'Pruitt', 1, 0),
    -- under management --
    ('Izzi', 'D`Agostino', 2, 1),
    ('Miles', 'Glover', 4, 6),
    ('Logan', 'Davis', 4, 6),
    -- independant --
    ('Joshua', 'Jaeger', 11, 1),
    -- manager --
    ('Seth', 'Jaeger', 3, 0),
    -- under management --
    ('Samantha', 'Pruitt', 9, 12),
    ('Emma', 'Pruitt', 9, 12),
    ('Billy', 'Pruitt', 10, 12),
    ('Aron', ' ', 7, 11),
    -- management --
    ('Alison', 'Pruitt', 6, 0),
    ('William', 'Pruitt', 8, 0);

--  id | first_name | last_name  |          title          |       department       |   salary
----+------------+------------+-------------------------+------------------------+------------
--  1 | Joshua     | Pruitt     | CEO                     | Upper Management       |     185000
--  2 | Izzi       | D`Agostino | Resident Beautiful Girl | Pretty Girl Department | 9999999999
--  3 | Miles      | Glover     | Software Engineer       | Engineering            |      86000
--  4 | Logan      | Davis      | Software Engineer       | Engineering            |      86000
--  5 | Joshua     | Jaeger     | Lawyer                  | Legal                  |     110000
--  6 | Seth       | Jaeger     | Lead Software Engineer  | Engineering            |     145000
--  7 | Samantha   | Pruitt     | Legal Team Lead         | Legal                  |     215000
--  8 | Emma       | Pruitt     | Legal Team Lead         | Legal                  |     215000
--  9 | Billy      | Pruitt     | Lawyer                  | Legal                  |     110000
-- 10 | Aron       | UNKNOWN    | Accountant Manager      | Finance                |     126000
-- 11 | Alison     | Pruitt     | Salesperson             | Sales                  |      88000
-- 12 | William    | Pruitt     | Accountant              | Finance                |      98000

