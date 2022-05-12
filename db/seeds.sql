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

