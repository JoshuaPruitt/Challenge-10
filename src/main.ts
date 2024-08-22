import { QueryResult } from 'pg';
import {pool, connectToDb} from './connection.js';
import inquirer from 'inquirer';

class Main {
    
    async startInit() {
        //connect to the database
        await connectToDb();

        this.mainChoices()
    }

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

    createEmployee(): void{
        //grab the role data to be inserted into the list
        const roleData: any = this.insert(
            `SELECT *
             FROM role`);

        console.log(roleData)
        
        //grab the employee data to select a manager
        const managerData: any = this.insert(
            `SELECT employee.id as ID, employee.first_name AS first_name, employee.last_name AS last_name,
             FROM employee`);

        console.log(roleData)
        
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
                    type: 'list',
                    name: 'employeeRole',
                    message: 
                        'What is the employees roll',
                    choices: [roleData]
                },

                {
                    type: 'list',
                    name: 'employeeManager',
                    message: 
                        "Does your employee have a manager?",
                    choices: [managerData, 'no']

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
    insert(query: string) {
        pool.query(query, (err: Error, result: QueryResult) => {
            if(err){
                console.log(err);
            } else if (result){
                console.log(result.rows);
                return result.json()
            }
        })
    };
    

}

//export the Main class to other files
export default Main;
