# mern-starter
MERN Boilerplate with User Authentication

# Table of Contents

* [Description](https://github.com/amurto/mern-starter#description)
* [Dependencies](https://github.com/amurto/mern-starter#dependencies)
* [Installation](https://github.com/amurto/mern-starter#installation)
  * [Prerequisites](https://github.com/amurto/mern-starter#prerequisites)
  * [Instructions](https://github.com/amurto/mern-starter#instructions)
* [Usage](https://github.com/amurto/mern-starter#usage)
* [License](https://github.com/amurto/mern-starter#license)

# Description

A Boilerplate for starting MERN applications with prebuilt Signin-Signup functionality using JWT token authentication. Clone the repo and start coding. The frontend uses Material-UI which offers great React components for faster and easier web development. 

# Dependencies

* [npm](https://www.npmjs.com/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [React.js](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)

# Installation

### Prerequisites

Install Node.js and npm using the link above. Follow instructions on their respecive websites. Npm is included with Node.js. Setup MongoDB locally or on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and get the connection string. This connection string has to be pasted [here](https://github.com/amurto/mern-starter/blob/master/backend/app.js) for mongoose to connect to the database.

### Instructions

Clone the repository
```bash
git clone https://github.com/amurto/mern-starter.git
```

Install all the dependencies on backend server
```bash
cd backend 
npm install
```

Install all the dependencies on frontend
```bash
cd frontend
npm install
```

# Usage

Run the backend server on port 5000
```bash
cd backend
npm start
```

Run the frontend webapp
```bash
cd frontend
npm start
```

Open a web browser and go to
```bash
http://localhost:3000
```

# License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[MIT License Link](https://github.com/amurto/mern-starter/blob/master/LICENSE)