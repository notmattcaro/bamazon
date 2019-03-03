// This assignment uses mySQL to create a database list what's in the existing database, pull an object from an existing table, and update new values

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

        promptBuy(); //query's the questions
    });
}
function validateNumber(input) {
    var sign = Math.sign(input); //If the argument is a positive number, negative number, positive zero or negative zero, the function will return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned.
	var integer = Number.isInteger(parseFloat(input)); // tests if number is an integer and incase it's a string turns it into a number

	if (integer && (sign === 1)) { //we want the input to be an integer and a positive number that's not "0"
		return true;
	} else {
		return 'Woah, please enter a number that is positive and not a zero yo';
	}
}
function promptBuy() {
    console.log("Now what would you like to purchase today?" + "\n"); // prompts buy

    inquirer.prompt([
        {
            type: 'input', 
            name: 'productId',
            message: 'Please select the item ID number that you would like to buy',
            validate: validateNumber,
            filter: Number
        }, {
            type: 'input', 
            name: 'itemQuantity',
            message: 'How many of these would you like to buy?',
            validate: validateNumber,
            filter: Number
        }
    ]).then(function(input) {

        let goods = input.productId; // number typed
        let quantity = input.itemQuantity; // quantity typed
        let sqlQuery = "SELECT * FROM products WHERE item_id = ?"; //Proper select syntax: Select all(*) from products(table) where id (references id)

        console.log("customer has chosen ID " + goods + " and has chosen a quantity of " + quantity + "\n");

        connection.query(sqlQuery, [goods], function(error, response) {// [goods] creates the value to fill that "?"
            if (error) throw error;
            let thisItems = response[0]; // MUST CREATE VARIABLE SO COMPUTER REMEMBERS OBJECT. This is important for the second mySQL query. 

            // console.log(response);
            // console.log("\n" + thisItems + "\n");
            // console.log("item ID: " + thisItems.item_id + "\n");
            // console.log("Stock quantity: " + thisItems.stock_quantity + "\n");

            if (quantity > thisItems.stock_quantity) { //checks if quantity asked to order is greater than existing quantity
                console.log("Sorry we don't have that many in stock! Please reselect.");
                setTimeout(() => {
                    showProducts();
                }, 2 * 1000);
            } else if(quantity <= thisItems.stock_quantity) { // allows for a purchase if quantity is "less than or equal to" in relation to the items quantity
                console.log("We've got that in stock, processing your order now!" + "\n");
                let sqlUpdate = 'UPDATE products SET stock_quantity= ' + (thisItems.stock_quantity - quantity) + ' WHERE item_id = ' + goods; // when concatinating DO NOT FORGET to properly space mySQL keywords! 
                connection.query(sqlUpdate, function(error, response) {
                    if(error) throw error;
                    console.log("Thank you! your order is now being processed. Your total comes out to be $" + thisItems.price * quantity + ".");
                    console.log("Please come again!");
                });
            }
        });
    });
}
showProducts();