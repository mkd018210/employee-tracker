// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");
const cfonts = require('cfonts');
//require("console.table");

// Express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Bootcamp2023SMU',
    database: 'jobs_db'
  },
  console.log(`Connected to the jobs_db database.`)
  );
  

  cfonts.say('jobs_db', {
    font: 'block',              
    align: 'left',              
    colors: ['candy'],           
    letterSpacing: 1,           
    lineHeight: 1,             
    space: true,                
    maxLength: '0',             
    gradient: false,            
    independentGradient: false, 
    transitionGradient: false,  
    env: 'node'                
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log("Employee Tracker");
    mainMenu();
  });

  function mainMenu() {
      inquirer
          .prompt({
              type: "list",
              name: "mainMenu",
              message: "What would you like to do?",
              choices: [
                  "View all departments",
                  "View all roles",
                  "View all employees",
                  "Add a department",
                  "Add an employee",
                  "Update an employee role",
                  "Exit"
              ]
          })
          .then(({ mainMenu }) => {
              switch (mainMenu) {
                  case "View all departments":
                      viewAllDepartments();
                      break;

                  case "View all roles":
                      viewAllRoles();
                      break;

                  case "View all employees":
                      viewAllEmployees();
                      break;

                  case "Add a department":
                      addDepartment();
                      break;

                  case "Add a role":
                      addRole();
                      break;

                  case "Add an employee":
                      addEmployee();
                      break;

                  case "Update an employee role":
                      updateEmployeeRole();
                      break;

                  case "Exit":
                      db.end();
                      console.log("Goodbye!");
                      break;
              }
          });
  };
  
 
  function viewAllDepartments() {
      const sql = "SELECT * FROM departments";
      db.query(sql, (err, res) => {
          if (err) throw err;
          console.table(res);
         
          mainMenu();
      })
  };
  
  
  function viewAllRoles() {
      const sql = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
      db.query(sql, (err, res) => {
          if (err) throw err;
          console.table(res);
          
          mainMenu();
      })
  };
  
 
  function viewAllEmployees() {
      const sql = `
      SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
      FROM employee e
      LEFT JOIN roles r ON e.role_id = r.id
      LEFT JOIN departments d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id;
      `;
      db.query(sql, (err, res) => {
          if (err) throw err;
          console.table(res);
         
          mainMenu();
      })
  };
  
 
  function addDepartment() {
      inquirer
          .prompt({
              type: "input",
              name: "name",
              message: "Enter the name of the new department:",
          })
          .then((answer) => {
              console.log(answer.name);
              const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}")`;
              connection.query(query, (err, res) => {
                  if (err) throw err;
                  console.log(`Added department ${answer.name} to the database!`);
                 
                  start();
                  console.log(answer.name);
              });
          });
  }
   
  function addEmployee() {
     
      connection.query("SELECT id, title FROM roles", (error, results) => {
          if (error) {
              console.error(error);
              return;
          }
  
          const roles = results.map(({ id, title }) => ({
              name: title,
              value: id,
          }));
  
          connection.query(
              'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
              (error, results) => {
                  if (error) {
                      console.error(error);
                      return;
                  }
  
                  const managers = results.map(({ id, name }) => ({
                      name,
                      value: id,
                  }));
  
                 
                  inquirer
                      .prompt([
                          {
                              type: "input",
                              name: "firstName",
                              message: "Enter the employee's first name:",
                          },
                          {
                              type: "input",
                              name: "lastName",
                              message: "Enter the employee's last name:",
                          },
                          {
                              type: "list",
                              name: "roleId",
                              message: "Select the employee role:",
                              choices: roles,
                          },
                          {
                              type: "list",
                              name: "managerId",
                              message: "Select the employee manager:",
                              choices: [
                                  { name: "None", value: null },
                                  ...managers,
                              ],
                          },
                      ])
                      .then((answers) => {
                          
                          const sql =
                              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                          const values = [
                              answers.firstName,
                              answers.lastName,
                              answers.roleId,
                              answers.managerId,
                          ];
                          db.query(sql, values, (error) => {
                              if (error) {
                                  console.error(error);
                                  return;
                              }
  
                              console.log("Employee added successfully");
                              start();
                          });
                      })
                      .catch((error) => {
                          console.error(error);
                      });
              }
          );
      });
  }
  
  
  
  function updateEmployeeRole() {
      const queryEmployees =
          "SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id";
      const queryRoles = "SELECT * FROM roles";
      db.query(queryEmployees, (err, resEmployees) => {
          if (err) throw err;
          db.query(queryRoles, (err, resRoles) => {
              if (err) throw err;
              inquirer
                  .prompt([
                      {
                          type: "list",
                          name: "employee",
                          message: "Select the employee to update:",
                          choices: resEmployees.map(
                              (employee) =>
                                  `${employee.first_name} ${employee.last_name}`
                          ),
                      },
                      {
                          type: "list",
                          name: "role",
                          message: "Select the new role:",
                          choices: resRoles.map((role) => role.title),
                      },
                  ])
                  .then((answers) => {
                      const employee = resEmployees.find(
                          (employee) =>
                              `${employee.first_name} ${employee.last_name}` ===
                              answers.employee
                      );
                      const role = resRoles.find(
                          (role) => role.title === answers.role
                      );
                      const query =
                          "UPDATE employee SET role_id = ? WHERE id = ?";
                      db.query(
                          query,
                          [role.id, employee.id],
                          (err, res) => {
                              if (err) throw err;
                              console.log(
                                  `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                              );
                              
                              start();
                          }
                      );
                  });
          });
      });
  }
  
  
  
 
  
  process.on("exit", () => {
      db.end();
  });
  