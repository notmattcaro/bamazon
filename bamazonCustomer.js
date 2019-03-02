require("dotenv").config();

const inquirer = require('inquirer');
const keys = require('./keys.js');
const mysql = require('mysql'); // this connects to mysql 

const sqlPass = keys.pass.secret;

var connection = mysql.createConnection({ // generates connection to mysql
    host: "localhost",
    
    port: 3306,
    user: "root", 
    password: sqlPass, // password for mysql kept secret
    database: "bamazon"
});

function showProducts() {
    console.log("Welcome to our store, below you'll find what's in stock!" + "\n"); //Welcome statement

    connection.query("SELECT * FROM products", function(error, response) { // selects all from products table and executes a function after processing all that info
        if (error) throw error; // if for some reason an error shows error
        for (let i = 0; i < response.length; i++) { // for loop is created to run through the array of responses
            const inventory = response[i];
            console.log("Item Number: " + inventory.item_id);
            console.log("Product: " + inventory.product_name);
            console.log("Department: " + inventory.department_name);
            console.log("Price: " + inventory.price);
            console.log("Stock: " + inventory.stock_quantity + "\n");
        }

        connection.end(); // ends the database query
        promptBuy(); //query's the questions
    });
}

function promptBuy() {
    console.log("Now what would you like to purchase today?" + "\n"); // prompts buy

    inquirer.prompt([
        {
            type: 'input', 
            name: 'product_id',
            message: 'Please select the item ID number that you would like to buy',
            filter: Number
        }, {
            type: 'input', 
            name: 'itemQuantity',
            message: 'How many of these would you like to buy?',
            filter: Number
        }
    ]).then(function(input) {

        let product = input.productId; 
        let quantity = input.itemQuantity;
        let queryString = 'SELECT * FROM products WHERE ?';

        connection.query(queryString, {item_id: item}, function(error, response) {
            if (error) throw error;

            if (response.length === 0) {
                console.log("Oh this is an error");
                showProducts();
            } else {

            }
            connection.end();
        });
    });

}

showProducts();