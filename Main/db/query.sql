SELECT department.department_name AS department, role.roles
FROM roles
LEFT JOIN department
ON roles.department_id = department_id
ORDER BY departments.department_name;