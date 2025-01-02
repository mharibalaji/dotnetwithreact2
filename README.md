# Product Management System
This web application allows users to manage a list of products with full CRUD operations. It features a user-friendly interface built with React.js for the frontend, and a robust backend built with .NET Core. Users can add, update, view, and delete products, and the application includes input validation, error handling, and JWT-based authentication (optional for bonus points).

# Features <br />
## Frontend (React.js)
Product List: View all products with sorting and filtering options.<br />
Product Form: Add and edit product details (Name, Price, Description, Category).<br />
CRUD Operations: Perform Create, Read, Update, and Delete actions.<br />
Client-side Validation: Ensure valid input for product fields.<br />
Confirmation Prompts: Confirm before deleting products.<br />

# Backend (.NET Core)
RESTful API: Expose endpoints for CRUD operations on products.<br />
Database Interaction: Use Entity Framework Core to interact with SQL Server or SQLite.<br />
Input Validation: Ensure proper validation of incoming data for all operations.<br />
Error Handling: Implement proper error handling for invalid requests and database errors.<br />
Authentication: Implement JWT-based authentication for secure access to the application.<br />

# Technologies Used <br />
## Frontend <br />
React.js <br />
Material-UI <br />
Axios (for API calls) <br />

## Backend <br />
.NET 8 <br />
Entity Framework InMemory  <br />
C# Web API  <br />

# Database
Entity Framework InMemory (for in-memory database) <br />

# Setup and Installation
## Frontend (React.js) <br />
Clone the repository <br />
cd task-management-frontend <br />
Install dependencies: <br />
npm install <br />
Start the React development server: <br />
npm start <br />

## Backend (.NET)
Clone the repository: <br />
cd task-management-backend <br />
Restore the .NET dependencies: <br />
dotnet restore <br />
Run the backend API: <br />
dotnet run <br />
The backend will be running at http://localhost:5002. <br />

## Database
Change the database connection string in appsettings.json. <br />

## Migration
Delete the Migrations folder
Run following commands<br />
dotnet ef migrations add InitialCreate<br />
dotnet ef database update<br />

# Running the Application <br />
Start both the frontend and backend servers. <br />
The frontend will automatically interact with the backend API. <br />

# Dependencies <br />
## Frontend <br />
React 18+ <br />
Axios <br />
Material-UI <br />

## Backend
.NET 8 <br />
Entity Framework InMemory <br />

## Challenges Faced
State Management: Managing complex state in React using hooks and ensuring smooth updates across components.<br />
Database Schema: Designing the database schema efficiently with Entity Framework Core for seamless CRUD operations.<br />
Authentication (optional): Implementing JWT authentication to secure API endpoints.<br />

## License
MIT License - See LICENSE for more details.
