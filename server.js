const inquirer = require("inquirer");
const questions = require('./models/questions')
const table = require("console.table");
const mysql = require('mysql');

//server connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    // Your username
    user:'root',
    password:'Password_1234',
    database: 'employee_db',
    
});

//functions for Questions popping after the welcome message is displayed
async function begin(){ 
    const yourAnwser = await inquirer.prompt(questions.quest);
    switch (yourAnwser.start) {
        case "Add an employee to the team":    
            newEmp();  
            break;
        case "Add a department to the team":
            addDept(); 
            break;
        case "Add a role to the team":
            addRole(); 
            break;
        case "View the departments of the team":  // working
            viewDept();
            break;
        case "View the employees of the team":
            viewEmp();
            break;
        case "View all the roles of the team": 
            allRoles();
            break;
        case "Update the employee's role in the team": 
            updateRole();
            break;
        case "Update the employee's Manager":
            updateManager();                            
            break;
        case "View employees by their manager": 
            viewEmpManager();
            break;
        case "View employees by their department": 
            viewEmpDept();
            break;
        case "Delete an employee":
            deleteEmp(); 
            break;
        case "Delete a role": 
            deleteRole();
            break;
        case "Delete a department":
            deleteDept();
            break;
        case "Total budget of a department":
            viewTotalBuget();
            break;
        case "Quit":  
            connection.end();
            break;
    }
}

// adding employees, departments and roles
async function newEmp(){
    let empValue = "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee"
    connection.query(empValue, async (err, employees) => {
        empValue = "SELECT id as value, title as name FROM emprole"
        connection.query(empValue, async (err, emproles) => {
            const employeeNew  = await inquirer.prompt(questions.newEmp(emproles, employees));
            empValue= "INSERT INTO employee SET ?"
            connection.query(empValue, employeeNew,(err) =>{
                if (err) throw err;
                console.log("New employee has been added to your team!");
                console.table(employeeNew);
                
                begin()
            });
        })
    })
}

// after adding run the view employee function or refresh your sql code to check the updated list of employees with your addition
async function addDept() {
    const questionsDept = await inquirer.prompt(questions.deptQuestions)
        connection.query("INSERT INTO department SET ?", {
                dept_name: questionsDept.depart_name
            },
            function (err) {
                if (err) throw err;
                console.log("New department has been added to your team!");
                console.table(questionsDept);
                begin()
            }
        );
    }


// after adding run the view department function or refresh your sql code to check the updated list of departments with your addition
async function addRole() {
    const roleDetails = await inquirer.prompt(questions.newRole)
    connection.query("INSERT INTO emprole SET ?", {
            title: roleDetails.title_r,
            salary: roleDetails.salary_r,
            department_id: roleDetails.id_r
            
        },
        function (err) {
            if (err) throw err;
            console.log("New Role has been added to your team!");
            console.table(roleDetails);
            begin()
        }
    );
} 

//view departments, employees,,roles, view employee by - only roles, only managers and only departments

viewDept = () =>{
    connection.query("SELECT * FROM department", (err, res)=> {
        if (err) throw err;
        console.table(res);
        begin()
    });
}

viewEmp = () => {
    connection.query("SELECT employee.first_name, employee.last_name, emprole.title, emprole.salary, department.dept_name AS department FROM employee LEFT JOIN emprole ON employee.role_id = emprole.id LEFT JOIN department ON emprole.department_id = department.id", function (err, res) {
        if (err) throw err;   
        console.table(res);
        begin()
    });
}

allRoles = () =>{
    connection.query("SELECT title FROM emprole", (err, res) =>{
        if (err) throw err;
        console.table(res);
        begin()
    });
}

async function viewEmpManager () {
    connection.query("SELECT * FROM employee", async (err, employee) => {
        const {
            managerid
        } = await inquirer.prompt([{
            type: "list",
            message: "Choose a manager:",
            name: "managerid",
            choices: () => {
                return employee.map((manager) => manager.manager_id);
            },
        }, ]);
        connection.query(`SELECT first_name, last_name FROM employee WHERE manager_id=${managerid}`, function (err, res) {
            if (err) throw err;

            console.table(res);
            begin();
        });
    })
}


async function viewEmpDept() {
    connection.query("SELECT * FROM department", async (err, department) => {
        const {
            departmentName
        } = await inquirer.prompt([{
            type: "list",
            message: "Select a Department:",
            name: "departmentName",
            choices: () => {
                return department.map((department) => department.dept_name);
            }
        }]);
        connection.query("SELECT employee.first_name, employee.last_name, emprole.title, emprole.salary, department.dept_name AS department FROM employee LEFT JOIN emprole ON employee.role_id = emprole.id LEFT JOIN department ON emprole.department_id = department.id", function (err, res) {
            if (err) throw err;
            console.log("You can now view your employees by their department!");
            console.table(res.filter((name) => departmentName === name.department));
            begin();
        });
    })
}