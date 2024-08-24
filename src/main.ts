import pg from 'pg';
import {pool, connectToDb} from './connection.js';
import inquirer from 'inquirer';

class Main {

    //function runs on start up
    async startInit() {
        //connect to the database
        await connectToDb();

        this.mainChoices()
    };

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
                    choices: ['View all employees', 'View all departments', 'View all roles', "Add role", "Add department", 'Create new employee', 'Update employee role'],
                },
            ])
            .then((answers: {ReadOrWrite: string}) => {
                //check what the user selected
                if(answers.ReadOrWrite === "Create new employee"){
                    this.createEmployee();

                } else if(answers.ReadOrWrite === "Add role"){
                    this.createRole();

                } else if(answers.ReadOrWrite === 'Add department'){
                    this.createDepartment();

                } else if(answers.ReadOrWrite === "View all departments"){
                    this.viewDepartments();

                } else if(answers.ReadOrWrite === "View all roles"){
                    this.viewRoles();

                } else if(answers.ReadOrWrite === "Update employee role"){
                    this.updateEmployeeRole();

                } else {
                    //if none of the following were selected then view the employee
                    this.viewEmployees();
                    
                }
            })
    };

    viewEmployees(): void{
        this.insert(`SELECT e.id AS ID, e.first_name AS First_Name, e.last_name AS Last_Name, role.title AS Title, 
            department.name AS Department, role.salary as Salary, concat(m.first_name, ' ', m.Last_Name) AS manager
            from employee e 
            LEFT JOIN employee m on e.manager_id = m.id
            INNER JOIN role ON e.role_id = role.id
            LEFT JOIN department ON role.departments = department.id;`
        )

        //send user back to main menu
        this.mainChoices();
    }

    viewRoles(): void{
        this.insert(`SELECT *
            FROM role;`
        )

        this.mainChoices();
    }

    viewDepartments(): void{
        this.insert(`SELECT *
            FROM department;`
        )

        this.mainChoices();
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
                        'What is the employees roll id?',
                },

                {
                    type: 'input',
                    name: 'employeeManager',
                    message: 
                        "Does your employee have a manager (please provide manager id)?",
                }
            ])
            .then((employeeData: {employeefName: string, employeelName: string, employeeRole: any, employeeManager: any}) => {
                

                this.insert(`
                    INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES
                        ('${employeeData.employeefName}', '${employeeData.employeelName}', ${parseInt(employeeData.employeeRole)}, ${parseInt(employeeData.employeeManager)});`)

                console.log(`Employee ${employeeData.employeefName + " " + employeeData.employeelName} added!`)

                // send user back to main menu
                this.mainChoices();
            });
    };

    updateEmployeeRole(){
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message:
                        "what is the id of the employee your trying to edit?",
                },

                {
                    type: 'input',
                    name: 'roleId',
                    message: 
                        "What is the id of the new role?",
                },
            ])
            .then((updatedRole: {employeeId: any, roleId: any}) => {
                this.insert(`
                    UPDATE employee 
                    SET role_id = ${parseInt(updatedRole.roleId)}
                    WHERE id = ${parseInt(updatedRole.employeeId)};`)

                this.mainChoices();
            });
    }


    //used to create and add new roles to the database
    createRole(): void{
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newRoll',
                    message: 
                        "What is the name of your New roll?"

                },

                {
                    type: 'input',
                    name: 'rollSalary',
                    message: 
                        "what is the salary of this new roll?"

                },

                {
                    type: 'input',
                    name: 'departmentId',
                    message: 
                        'what is the id of the deparment'
                }
            ])
            .then((rollData: {newRoll: string, rollSalary: any, departmentId: any}) => {

                this.insert(`
                    INSERT INTO role (title, salary, departments)
                    VALUES
                        ('${rollData.newRoll}', ${parseInt(rollData.rollSalary)}, ${parseInt(rollData.departmentId)});`)

                console.log(`Roll ${rollData.newRoll} added!`)

                this.mainChoices();
            });
    };

    //used to create and add departments to the database
    createDepartment(): void {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 
                        "What is the name of your new department?"
                }
            ])
            .then((deparmentName: {departmentName: string}) => {
                this.insert(`
                    INSERT INTO department (name)
                    VALUES ('${deparmentName.departmentName}');`)

                console.log(`Department ${deparmentName.departmentName} Added!`)

                this.mainChoices();
            });
    }

    //used to send commands to the database
    insert(query: string) {
        
        pool.query(query, (err: Error, result: pg.QueryResult) => {
            if(err){
                console.log(err);
            //edit this to insert parameters as well
            } else if (result){
                console.log(result.rows);
                return result.rows[0]
            }
        })
    };
    

}

//export the Main class to other files
export default Main;
