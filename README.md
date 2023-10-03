# Ekinoks-backend-project
Ekinoks NodeJS Coding Challenge
About the Project
This project establishes the basic structure of a web application with online shopping functionality. Customers can browse products, place orders, and manage their account information. The project is built using Express.js and PostgreSQL.

Project Structure
The project follows a modular structure, organizing functionality into different sections. Below are the details of the project structure:

controllers
This directory contains controller files that manage different sections of the application. Each controller performs relevant operations.
• customercontroller.ts: Controllers managing customer operations.
• ordercontroller.ts: Controllers managing order operations.
• productcontrollers.ts: Controllers managing product operations.

middlewares
This directory contains middleware files that provide common functionality in the application. Middlewares process incoming requests and perform specific checks.
• authmiddlewares.ts: Middlewares used for authentication.

models
This directory defines data models and performs related database operations. Each model manages operations related to a specific data type.
• customermodel.ts: Customer data model and related database operations.
• ordermodels.ts: Order data model and related database operations.
• productmodels.ts: Product data model and related database operations.

routes
This directory defines different routes of the application. Each route performs specific functionality.
• authroutes.ts: Routes managing user login and registration operations.
• customerroutes.ts: Routes managing customer operations.
• orderroutes.ts: Routes managing order operations.
• productroutes.ts: Routes managing product operations.

app.ts
This file is the main file of the application. It contains Express settings, defines routes, and establishes the PostgreSQL database connection.

Installation
To run the project in a local environment, you can follow these steps:
npm install
Create your PostgreSQL database and update the connection settings in the app.ts file.
Start the project:
bashCopy code
start the project with node dist/app.js
Usage
When the application starts, you can visit the project at http://localhost:3000. The application allows customers to browse products, place orders, and manage their account information.







