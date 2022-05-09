# Employeeasy Server

Employeeasy Server is the backend to the employeeasy app. It connects to a MongoDB database, which contains all data the employeeasy app uses to run.

## Installation

There are two ways to try out the API. The first one is to use the deployed version found [here](https://tranquil-caverns-72557.herokuapp.com/). You can make all types of requests and you can also hook it up to a personal app if you so please.

You can also use the source code from this repo; however, you need the secret variables. In that case, you can contact me and I can grant you access to the collection. After that:

- clone this repo on your local machine
- run `npm install`
- run `npm run dev`
- make some requests using Postman

## Databases

This repo contains 6 routers that connect to 4 MongoDB collections. These are as follows:

- /api/employees - contains personal information about company employees (`name`, `phone`, `email`, `department`, `startDate`, `employmentType`, `_id`)
- /api/expenses - contains personal information about employee expenses (`merchant`, `date`, `amount`, `currency`, `status`, `employee`, `_id`)
- /api/vacation - contains personal information about employee vacation (`startOn`, `endOn`, `employee`, `daysLeft`, `status`, `_id`)
- /api/users - contains log in information about signed-up users (`_id`, `name`, `email`, `createdAt`, `updatedAt`) and also allows creating accounts, by providing `fullName`, `username`, `email` and `password`
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
├── /expenses
│   └── GET
│       ├── /
│       └── /:expenseId
│
│   └── POST /
│
│   └── DELETE /:expenseId
│
│   └── PUT /:expenseId
│
├── /vacation
│   └── GET
│       ├── /
│       └── /:vacationId
│
│   └── POST /
│
│   └── DELETE /:vacationId
│
│   └── PUT /:vacationId
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

### POST `/api/users`

```
// req.body
{
  fullName: String,
  username: String,
  password: String,
  passwordConfirmation: String,
  email: String
}

// res.body
{
  status: 200
}
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

## Creating and Editing Entries

Start with logging in (sending a POST request to `/api/login`), or by signing up (sending a POST request to `/api/users`). See above for what the payload should be and what the responses should be. In case you sign up for a new account, you need to log in afterwards.

To begin with, a user needs to sign up, or log in. Each user is assumed to be a line manager, managing employees. Each manager is assigned their own employees and they are only allowed to perform requests involving those instances in the collections.

When performing a `POST` request to `/api/employees`, the employee is added under the corresponding manager (which is inferred based on the logged in user). The same applies to expense and vacation entries (on entering the name, the entry is linked to the employee entry). `DELETE` or `PUT` requests that provide the correct `:id` but involve a different account are not allowed (the API leverages JWT authentication). To complete requests that require authentication, you can use the `accessToken` that is returnt when logging in, through an Authorization Header.

## Tech Stack

The Employeeasy Server utilizes Node.js (in TypeScript) and Express. It connects to a MongoDB instance using Mongoose. Schema validation is performed using Joi. Testing is performed using Jest.
