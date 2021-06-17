# Node DB1 Project Starter Code

## Introduction

- Relational Databases
- Writing Basic SQL Queries
- Writing Basic Queries using Knex.js

## Instructions

### Task 1: Project Setup

There are two possible ways to submit your project. Your instructor should have communicated which method to use for this project during the Guided Project and in your cohort's Slack channel. If you are still unsure, reach out to Lambda Staff.

#### Option A - Codegrade

- [ ] Fork and clone the repository.
- [ ] Open the assignment in Canvas and click on the "Set up git" option.
- [ ] Follow instructions to set up Codegrade's Webhook and Deploy Key.
- [ ] Push your first commit: `git commit --allow-empty -m "first commit" && git push`.
- [ ] Check to see that Codegrade has accepted your git submssion.

#### Option B - Pull Request

- [x] Fork and clone the repository.
- [x] Implement your project in a `firstname-lastname` branch.
- [x] Create a pull request of `firstname-lastname` against your `main` branch.
- [x] Open the assignment in Canvas and submit your pull request.

### Task 2: Minimum Viable Product

### 2.1 Write Basic SQL Queries

Visit [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/trysql.asp?filename=trysql_select_all) using Chrome and build the queries below. Once they work copy them to the `queries.sql` file at the root of the project.

-[x] Find all customers with postal code 1010. Returns 3 records.
-[x] Find the phone number for the supplier with the id 11. Should be (010) 9984510.
-[x] List first 10 orders placed, sorted descending by the order date. The order with date 1997-02-12 should be at the top.
-[x] Find all customers that live in London, Madrid, or Brazil. Returns 18 records.
-[x] Add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.
-[x] Update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.

**Clicking the `Restore Database` button in the page will repopulate the database with the original data and discard all changes you have made**.

### 2.2 Build a RESTful API for the Accounts Resource

We have provided some records inside the "accounts" table of the `budget.db3` database. You can restore the database (even after deleting the database) by running the following command:

```js
npm run resetdb
```

#### Accounts Schema

| field  | data type        | metadata                                            |
| ------ | ---------------- | --------------------------------------------------- |
| id     | unsigned integer | primary key, auto-increments, generated by database |
| name   | string           | required, unique                                    |
| budget | numeric          | required                                            |

#### Write Model Functions

- Write the following db access functions inside `api/accounts/accounts-model.js` using Knex:

  -[x] `getAll` resolves to an array of accounts (or an empty array)
  -[x]`getById` resolves to an account by the given id
  -[x]`create` resolves to the newly created account
  -[x]`updateById` resolves to the updated account
  -[x] `deleteById` resolves to the deleted account

#### Write Middleware

- Write the following middlewares inside `api/accounts/accounts-middleware.js`:

  - [x]`checkAccountPayload` returns a status 400 with if `req.body` is invalid:

    - If either name or budget are undefined, return `{ message: "name and budget are required" }`
    - If name is not a string, return `{ message: "name of account must be a string" }`
    - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
    - If budget is not a number, return `{ message: "budget of account must be a number" }`
    - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`

  -[x] `checkAccountId` returns a status 404 with a `{ message: "account not found" }` if `req.params.id` does not exist in the database

  - [x]`checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database

### Write Accounts API

- Write CRUD for the `accounts` resource, using the middlewares and model functions above wherever appropriate:

  - `[GET] /api/accounts` returns an array of accounts (or an empty array if there aren't any).
  - `[GET] /api/accounts/:id` returns an account by the given id.
  - `[POST] /api/accounts` returns the created account. Leading or trailing whitespace on budget `name` should be trimmed before saving to db.
  - `[PUT] /api/accounts/:id` returns the updated account. Leading or trailing whitespace on budget `name` should be trimmed before saving to db.
  - `[DELETE] /api/accounts/:id` returns the deleted account.

- Manually test your endpoints with a REST client like `Insomnia` or `Postman` to check they are working as expected.
- Test your endpoints automatically by running `npm test`.

#### Important Notes

- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install additional libraries or add additional scripts.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work.
- Perform basic professional polishing including spell-checking and grammar-checking on your work.

### Task 3: Stretch Problems

The following exercises **require research**, the concepts needed to complete them have not been covered in class yet.

- Run more queries.

  - Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted. Should be 69.
  - Find all suppliers who have names longer than 20 characters. Returns 11 records.
  - Add a `query string` option to the `GET /api/accounts` endpoint. The `query string` may contain `limit`, `sortby` and `sortdir` keys. If these keys are provided, use these values to limit and sort the `accounts` which are selected from the database. Reference the docs for sorting and limiting in [knexjs.org](http://knexjs.org/).

  ```js
  // sample req.query object
  {
    limit: 5,
    sortby: 'id',
    sortdir: 'desc'
  }
  ```
