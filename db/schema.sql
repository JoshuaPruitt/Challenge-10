-- create the employee table -- 
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- use the new database --
\c employees_db

-- the department table (contains each department) --
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- role table (contains all job titles) --
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departments INTEGER,
    FOREIGN KEY (departments)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- employee table (contains all employees) --
CREATE TABLE employee (
    -- creates an id column in the employee table (will be linked to all tables)--
    id SERIAL PRIMARY KEY,

    -- Creates a first name column with a limit of 30 characters --
    first_name VARCHAR(30) NOT NULL,

    -- last name column --
    last_name VARCHAR(30),

    -- role id (references the id in ) --
    role_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES  role(id)
    ON DELETE SET NULL,

    -- manager id, References id in this table --
    manager_id INTEGER,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);