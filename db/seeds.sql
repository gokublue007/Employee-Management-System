USE employee_db;

-- Creates new rows
INSERT INTO department (dept_name)
VALUES ("MANAGEMENT"),("FINANCE"), ("IT"),("R&D"),("MARKETING");

INSERT INTO emprole (title, salary, department_id)
VALUES ('President', 700000, 1),
('CEO', 550000, 1),
('CFO', 550000, 1),
('Vice President', 470000, 1),
('Director of Finance', 300000, 2),
('Director of IT', 300000, 3),
('Director of R&D', 300000, 4),
('Director of Marketing', 300000, 5),
('Financial Analyst', 150000, 2),
('Programming Manager', 150000, 3),
('R&D Researcher', 100000, 4),
("Marketing Consultant", 100000, 5),
("Computer Programmer", 100000, 3),
('Sales Associate', 85000, 5),
('Accountant', 67000, 2),
('Secretary', 55000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Elias','Vasquez',1, 1),
        ('Walter', 'Vasquez', 2, 1),
        ('Reynaldo', 'Vasquez', 3, 1), 
        ('Noe', 'Orellana', 4, 1), 
        ('Lando','Orellana', 4, 1),
        ('Johanna', 'Vasquez', 4, 1), 
        ('Tiger', 'Woods', 5, 3 ),
        ('2', 'Pac', 6, 1),
        ('Snoop', 'Dogg', 7, 2),
        ('Biggie', 'Smalls', 8, 4),
        ('Mac', 'Miller', 9, 3), 
        ('K9', 'Unit', 9, 3),
        ('Kevin', 'Hart', 9, 3),
        ('Will', 'Smith', 10, 8 ), 
        ('Bad', 'Bunny', 10, 8),


SELECT employee.first_name, employee.last_name, emprole.title,emprole.salary, department.dept_name, employee_m.first_name AS Manager_fame, employee_m.last_name AS Manager_lname
FROM employee JOIN emprole ON employee.role_id = emprole.id JOIN department ON emprole.department_id = department.id LEFT JOIN employee AS employee_m ON employee.manager_id = employee_m.id;
SELECT * FROM department;
SELECT * FROM emprole;
SELECT * FROM employee;
