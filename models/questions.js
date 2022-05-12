module.exports = {
    quest: {
      //initial Question
        type: "list",
        message:
        "Welcome to the Employee Management System. Where would you like to start?",
        name: "start", //initial roles being displayed
        choices: [
            "Add an employee to the team",
            "Add a department to the team",
            "Add a role to the team",
            "View the departments of the team",
            "View the employees of the team",
            "View all the roles of the team",
            "Update the employee's role in the team",
            "Update the employee's Manager",
            "View employees by their manager",
            "View employees by their department",
            "Delete an employee",
            "Delete a role",
            "Delete a department",
            "Total budget of a department",
            "Quit",
    ],
        newEmp: (emproles, employees) => [
        {
            type: "input",
            message: "Enter the employee's first name?",
            name: "first_name",
        },
        {
            type: "input",
            message: "Enter the employee's last name?",
            name: "last_name",
        },
        {
            type: "list",
            message: "Enter the employee's role?",
            name: "role_id",
            choices: emproles, // look for it again for updating the manager
        },
        {
            type: "list",
            message: "Enter the employee's manager?", // questions popping up again
            name: "manager_id",
            choices: employees,
        },
    ],