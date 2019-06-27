# orm-database
![build status](https://travis-ci.org/orm-database/orm-database.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/orm-database/orm-database/badge.svg?branch=master)](https://coveralls.io/github/orm-database/orm-database?branch=master)

## Getting Started

** Prerequisites? **

### Getting Set Up

1. Clone this repository on GitHub with `git clone https://github.com/orm-database/orm-database.git`

2. `cd orm-database`

3. Run `npm run setup` to install all dependencies this repo requires

### Start the Development Server

* Run `npm run dev` to start both the express server and the React development server

# API Reference

## Users

### Endpoints

* `POST /api/users`
* `GET /api/users/:id`
* `POST /api/users/login`
* `DELETE /api/users/login`
* `GET /api/users`

### Create a user

* Arguments

  * first_name
  * last_name
  * email_address
  * alias
  * password
  * password_confirm
  * created*
  * session_token**

* ``` 
  POST /api/users
  ```

  ```
  {
      "first_name": "Justin",
      "last_name": "Louie",
      "email_address": "justin.louie@example.com",
      "alias": "jlouie",
      "password": "password",
      "password_confirm": "password",
      "created": "2019-06-26 23:43:19"
  }
  ```

* Response:

  ```
  {
      "user_id": 1,
      "email": "justin.louie@example.com"
  }
  ```

### Retrieve a user

* ```
  GET /api/users/:id
  ```

* Response:

  ```
  @TODO complete example
  ```

### Log in a user

* Arguments

  * email_address
  * alias
  * password

  The request must contain one of: `email_address` or `alias`.

* ```
  POST /api/users/login
  ```

  ```
  {
      "email_address": "justin.louie@example.com",
      "password": "password"
  }
  ```

* Response:

  ```
  {
      "user_id": 1,
      "first_name": "Justin",
      "last_name": "Louie",
      "email_address": "justin.louie@example.com",
      "alias": "jlouie",
      "created": "2019-06-27T04:43:19.000Z",
      "updated": "2019-06-27T06:06:09.000Z"
  }
  ```

 ### Log out a user

* To log out, pass a `x-session-token` header identifying the session for which the request is being made.

* ```
  DELETE /api/users/login
  ```

  ```
  x-session-token:760e7bf0-98a4-11e9-ab0d-6d227d758f5a
  ```

* Response:

  ```
  {
      "message": "user logged out successfully"
  }
  ```

### List all users

* When the request is created *with* a `x-session-token` header, the response will only contain the corresponding user. If no sessions are found, the API returns an error.

* When the request is created *without* a `x-session-token` header, the response will contain a `data` property which is an array of users.

* ```
  GET /api/users
  ```

* Response:

  ```
  {
      data: [
          {
              "user_id": 1,
              "first_name": "Justin",
              "last_name": "Louie",
              "email_address": "justin.louie@example.com",
              "alias": "jlouie",
              "session_token": "760e7bf0-98a4-11e9-ab0d-6d227d758f5a",
              "created": "2019-06-27T04:43:19.000Z",
              "updated": "2019-06-27T06:26:13.000Z"
          },
          {
              "user_id": 2,
              "first_name": "Larry",
              "last_name": "Page",
              "email_address": "larry@google.com",
              "alias": "lpage",
              "session_token": "c628e560-98f1-11e9-9320-dbca5b68eae4",
              "created": "2019-06-27T04:43:19.000Z",
              "updated": "2019-06-27T14:44:28.000Z"
          }
      ]
  }
  ```