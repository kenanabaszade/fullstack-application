Full Stack Application

This project uses technologies such as React.js, Node.js, Express.js, SQLite, REST API, JSX, and NPM. I've built a full stack application where users can create an account, log in and interact with the database using a REST API build with Node.js and Express.js. The App interacts directly with the database, using CRUD methods. The user can read and create any course information and store it in the database. The user can only update and delete courses that he creates. The application uses react authentication along with Sequelize validation to secure user's access.

To run this application locally, go to **api folder** and run:
### `npm install`
It will install the required dependencies.

*then*
### `npm run seed`
To create your application's database and populate it with data.

*finally*
### `npm start`
To run the Node.js Express application on [http://localhost:5000](http://localhost:5000) 

Now, go to the **client folder** and run:
### `npm install`
It will install the required dependencies.

*finally*
### `npm start`
To run the React application on [http://localhost:3000](http://localhost:3000) 

## Optionally

You can run both *server* and *client* in the **api folder**

In the **api folder**

### `npm install`
It will install the required dependencies.

*then*
### `npm run seed`
To create your application's database and populate it with data.

*then*
### `npm run client-install`
It will install the required dependencies in the client folder.

*finally* 
you can run both with the command:
### `npm run dev`
It will run the server on [http://localhost:5000](http://localhost:5000) and the client on [http://localhost:3000](http://localhost:3000) 

Stack:
- Javascript ES6
- Node.js
- Express.js
- Sequelize
- React.js
- SQLite
- JSON
- Material-UI
- CSS3
- HTML5
