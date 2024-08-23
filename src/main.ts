import pg from 'pg';
import {pool, connectToDb} from './connection.js';
import inquirer from 'inquirer';

class Main {

    //function runs on start up
    async startInit() {
        //connect to the database
        await connectToDb();

        this.mainChoices()
    }

    //user grab function is not ready....
    //used to fetch the user data
    // async fetchChoices(){
    //     //fetch data from the database
    //     const query: string = "SELECT id FROM employee";
    //     const users: any = this.insert(query);

    //     const userChoices = users.map(user => ({
    //         name: `${user.first_name, user.last_name}`,
    //         value: user.id,
    //     }));

    //     return userChoices
    // }

    //gives the menu choices
    mainChoices(): void{
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'ReadOrWrite',
                    message: 
                        'Would you like to Create a new employee or view existing ones?',
                    choices: ['Create new employee', 'View existing employees', "Add department", "Add role"],
                },
            ])
            .then((answers: {ReadOrWrite: string}) => {
                //check what the user selected
                if(answers.ReadOrWrite === "Create new employee"){
                    this.createEmployee();

                } else if(answers.ReadOrWrite === "Add department"){

                } else if(answers.ReadOrWrite === 'Add role'){

                } else {
                    this.insert(`SELECT e.id AS ID, e.first_name AS First_Name, e.last_name AS Last_Name, role.title AS Title, 
                                department.name AS Department, role.salary as Salary, concat(m.first_name, ' ', m.Last_Name) AS manager
                                from employee e 
                                LEFT JOIN employee m on e.manager_id = m.id
                                INNER JOIN role ON e.role_id = role.id
                                LEFT JOIN department ON role.departments = department.id;`
                            )
                }
            })
    }

    //creates and adds the employee to the database using inquirer
    createEmployee(): void{
        
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'employeefName',
                    message: 
                        "What is the first name of your New Employee"

                },
                
                {
                    type: 'input',
                    name: 'employeelName',
                    message: 
                        "What is the last name of your New Employee"
                },
                
                {
                    //want to change the next two inputs to a list so that all the inputted roles and managers are displayed as choices
                    type: 'input',
                    name: 'employeeRole',
                    message: 
                        'What is the employees roll',
                },

                {
                    type: 'input',
                    name: 'employeeManager',
                    message: 
                        "Does your employee have a manager?",
                }
            ])
            .then((roleData: {employeefName: any, employeelName: any, employeeRole: any, employeeManager: any}) => {
                

                this.insert(`
                    INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES
                        (${roleData.employeefName}, ${roleData.employeelName},)`)
            })
    }

    //used to send commands to the database
    insert(query: string, params?: any[]) {
        
        pool.query(query, (err: Error, result: pg.QueryResult) => {
            if(err){
                console.log(err);
            } else if (result){
                console.log(result.rows);
                return result.rows[0]
            }
        })
    };
    

}

//export the Main class to other files
export default Main;
