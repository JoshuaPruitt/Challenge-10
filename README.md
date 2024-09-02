# Challenge-10 (Employee Creator)

## Introduction

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

This app lets you create cars!

## Table of Contents

- [Required-Technologies](#required-technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Code Snippet](#code-snippet)
- [Features](#features)
- [Future-Features](#future-features)
- [License](#license)
- [Technologies](#technologies-used)
- [Credits](#credits)
- [Contact Me](#contact-me)

## Required Technologies

This project requires node.js and its included npm package manager.\
You can go to <a href="https://nodejs.org/en/download/package-manager">this</a> website to download node.js and npm. Just follow node's included download instructions!

Postgres SQL is also required to run the project and interface with databases. <a href="https://www.postgresql.org/download/">Postgres Download</a> this link can be used to download the postgres software. Follow the provided guide to install correctly.

## Installation

Once the files are downloaded onto your machine open the project folder in your preferred terminal.\
To install the necessary dependencies run the "npm install" command to install the required files.

Next go to the .env.EXAMPLE file and add your postgres username and password, then rename the file to just .env. Then navigate to the 'db' directory in your terminal (cd db) and start psql by running 'psql -U {username}'. Once started you can run '\i schema.sql;' to initilize the database. You then have the option to either quit out or run '\i seeds.sql;' for some starter information.

Once you've exited psql navigate back to the projects root directory. Finally, run "npm run start" to run the employee creator!

## Usage

Once you run "npm run start" and have installed all dependancies you will be prompted with a main menu in your terminal. The options include "View all employees", "View all departments", "View all roles", "Add role", "Add department, and "create new employee".

You can use the arrow keys to scroll through the menu and the enter key to select and option. You will be prompted with questions with any of the create or update options. View options only need to be selected to be used, once their information is displayed you can press the arrow keys to once again use the main menu.

## Code Snippet

This code inables the database to be interfaced with.

```
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});

const connectToDb = async () => {
    try {
        await pool.connect();
        console.log("Connected to the Database");
    } catch (err) {
        console.log('ERROR Connecting to database:', err);
        process.exit(1);
    }
};
```

## Features

Features include:

- View databases like, viewing employees, roles, and departments
- A menu for selecting functions
- Options to create new employees, roles, and departments
- Options to update employee roles

## Future Features

Features that may be implemented in the future include:

- giving a choice of options instead of chaning a value.
- Delete option.
- Cancel option.

## License

Licensed under the MIT license.

## Technologies Used

<ul>
<li>SQL (for data storage and retreival)
<li>Node.js (for installing packages as well as building and running code).</li>
<li>Inquire.js (for question prompts).</li>
<li>Visual Studio Code (for writing code).</li>
<li>Mozila Web Docs and W3 Schools (for getting help with JavaScript).</li>
</ul>

## Credits

<ul>
<li>Joshua Pruitt (me)</li>
<li>Coding bootcamp staff (for their help with Coding)</li>
<ul>

## Contact Me

<ul>
<li>My email: joshuapruitt6484@gmail.com</li>
<li><a href=https://github.com/JoshuaPruitt>My GitHub</a></li>
<li><a href=https://www.linkedin.com/in/joshua-pruitt-1a494a311>My LinkedIn</a></li>
</ul>
