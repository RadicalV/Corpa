# Corpa

## Description of the problem to be solved

### Purpose of the system

The aim of the project is to facilitate the presentation or retrieval of business information.
The working principle is that the platform itself consists of two parts: a web application to be used by entrepreneurs, users and administrators, and an Application Programming Interface (API).
In order to use the platform, the entrepreneur will register with the web application and will be able to add the companies he has set up to the system. They will also be able to create a list of the company's branches and add the employees working in these branches. The information of the added companies can be viewed by a normal user of the system. The administrator will be able to change the roles of users, remove companies, branches or employees if they are added incorrectly.

### Functional requirements

A non-registered user of the system will be able to:

1. View the platform homepage;
2. log in (register) to the web application.

A registered user will be able to:

1. Log out of the application;
2. Login to the platform;
3. View the companies, branches and employees added to the system

As an CEO, users will be able to:

1. Log out of the web application;
2. Login to the platform;
3. Create a new company:

   - Fill in the company information form
   - Add branches
   - Add employees to the branches

4. View companies added by other CEO users;

The administrator will be able to:

1. Change user roles
2. Remove users
3. Remove inappropriate companies, branches, employees

## System architecture

System components:

- Front-End - using React.js;
- Back-End - using Node.js.
- Database - PostgreSQL.


![Diagram](https://user-images.githubusercontent.com/40595871/209195351-d0ebbccb-da85-45e0-9ce4-3abffdc88a80.png)
