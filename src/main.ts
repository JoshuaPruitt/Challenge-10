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
                    choices: ['Create new employee', 'View existing employees'],
                },
            ])
            .then((answers: {ReadOrWrite: string}) => {
                //check what the user selected
                if(answers.ReadOrWrite === "Create new employee"){


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

    }

    //used to send commands to the database
    insert(query: string): void {
        pool.query(query, (err: Error, result: QueryResult) => {
            if(err){
                console.log(err);
            } else if (result){
                console.log(result.rows);
            }
        })
    };
    

}

//export the Main class to other files
export default Main;
