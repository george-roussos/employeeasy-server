# Employeeasy Server

Employeeasy Server is the backend to the employeeasy app. It connects to a MondoDB database, which contains all data the employeeasy app uses to run.

## Installation

To try out the API, you can contact me and I can grant you access to the collection. After that:

- clone this repo on your local machine
- run `npm install`
- run `npm run dev`
- make some requests using Postman

## Databases

This repo contains 3 routers that connect to 2 MongoDB collections. These are as follows:

- /api/employees - contains personal information about company employees (`name`, `phone`, `email`, `department`, `startDate`, `employmentType`, `_id`)
- /api/users - contains log in information about signed-up users (`_id`, `name`, `email`, `createdAt`, `updatedAt`)
- /api/login - allows logging into the application, by providing `username` and `password`

See 'Endpoints' section for more information (WIP).

## API Overview

```
/api
.
├── /users
│   └── GET
│       ├── /
│       └── /:userId
│
│   └── POST /
│
│   └── DELETE /:userId
│
│   └── PUT /:userId
│
├── /employees
│   └── GET
│       ├── /
│       └── /:employeeId
│
│   └── POST
│       └── /
│
│   └── DELETE /:employeeId
│
│   └── PUT /:employeeId
│
├── /login
│   └── POST
│       └── /

```

## Endpoint specifications

To begin with, a user needs to sign up, or log in. Each user is assumed to be a line manager, managing employees. Each manager is assigned their own employees and they are only allowed to perform requests involving those instances in the collections. The idea is that the manager inputs their own name in the "manager" field when inputting new employee entries and that is when the API will allow a POST request.

The API uses JWT authentication, so requests that involve employees that do not reference the logged in user, are rejected.

Below are the endpoints.

### POST `/api/login`

```
// req.body
{
  username: String,
  password: String,
}

// res.body
{
  accessToken: String,
}
```

### GET `/api/users`

```
// res.body
[
 {
  _id: String,
  username: String,
  name: String,
  email: String,
  createdAt: String,
  updatedAt: String
 }
]
```

### GET `/api/users/:userId`

```
// req.params
{
  userId: String
}

// res.body
{
  _id: String,
  username: String,
  name: String,
  email: String,
  createdAt: String,
  updatedAt: String
}
```

### DELETE `/api/users/:userId`

```
// req.params
{
  userId: String
}

// res.body
{
  status: 200
}
```

### PUT `/api/users/:userId`

```
// req.params
{
  userId: Integer
}

// res.body
{
  status: 200
}
```

### GET `/api/employees`

```
// res.body
[
 {
  _id: String,
  name: String,
  email: String,
  phone: String,
  department: String,
  startDate: String,
  employmentType: String,
  manager: Array,
  createdAt: String,
  updatedAt: String
 }
]
```

### GET `/api/employees/:userId`

```
// req.params
{
  userId: String
}

// res.body
{
  _id: String,
  name: String,
  email: String,
  phone: String,
  department: String,
  startDate: String,
  employmentType: String,
  manager: Array,
  createdAt: String,
  updatedAt: String
}
```

### DELETE `/api/employees/:userId`

```
// req.params
{
  userId: String
}

// res.body
{
  status: 200
}
```

### PUT `/api/employees/:userId`

```
// req.params
{
  userId: Integer
}

// res.body
{
  status: 200
}
```

## Tech Stack

The Employeeasy Server utilizes Node.js (in TypeScript) and Express. It connects to a MongoDB instance using Mongoose. Schema validation is performed using Joi. Testing is performed using Jest.
