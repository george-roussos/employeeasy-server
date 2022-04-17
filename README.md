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

## Creating and Editing Employees

To begin with, a user needs to sign up, or log in. Each user is assumed to be a line manager, managing employees. Each manager is assigned their own employees and they are only allowed to perform requests involving those instances in the collections. When performing a `POST` request to `/api/employees`, the employee is added under the corresponding manager (which is inferred based on the logged in user). In conjuction with the frontend, only employees of this manager's line are displayed. `DELETE` or `PUT` requests that provide the correct `:id` but involve a different manager are not allowed (the API leverages JWT authentication).

## Tech Stack

The Employeeasy Server utilizes Node.js (in TypeScript) and Express. It connects to a MongoDB instance using Mongoose. Schema validation is performed using Joi. Testing is performed using Jest.
