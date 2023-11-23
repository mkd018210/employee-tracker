INSERT INTO departments (name)
VALUES ('Executives'),
       ('Human Resources'),
       ('Marketing'),
       ('Sales'),
       ('Accounting');

INSERT INTO roles  (title, salary, department_id)
VALUES ('CEO', 300,000.00, 1)
       ('COO', 250,000.00, 1)
       ('HR Manager', 200,000.00, 2),
       ('Marketing Manager', 200,000.00, 3),
       ('Sales Manager', 150,000.00, 4),
       ('Salesperson', 1000,000.00, 4),
       ('Accunt Manager', 150,000.00, 5),
       ('Accountant', 100,000.00, 5);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES ('Person', 'One', 1, 1),
       ('Person', 'Two', 2, 1),            
       ('Person', 'Three', 3, 2), 
       ('Person', 'Four', 4, 3), 
       ('Person', 'Five', 5, 4), 
       ('Person', 'Six', 6, 4), 
       ('Person', 'Seven', 7, 5), 
       ('Person', 'Eight', 8, 5), 