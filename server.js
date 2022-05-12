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