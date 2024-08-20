-- file for viewing table --
-- selecting all from the employee table --
-- SELECT *
-- FROM employee
-- JOIN role ON employee.role_id = role.id;

-- selects all necessary elements to be displayed --
SELECT e.id AS ID, e.first_name AS First_Name, e.last_name AS Last_Name, role.title AS Title, 
department.name AS Department, role.salary as Salary, concat(m.first_name, ' ', m.Last_Name) AS manager
from employee e 
LEFT JOIN employee m on e.manager_id = m.id
INNER JOIN role ON e.role_id = role.id
LEFT JOIN department ON role.departments = department.id;



