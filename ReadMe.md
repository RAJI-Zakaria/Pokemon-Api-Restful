# Examination project : Restful API

This is a little Docs explaining the project's main pillars.
<br>Please note that the data is saved directly into a local file inside the folder `/data`
<br>To consume the API resources a password is required in the header of the request :

```
"x-password" : "IAI2"
```

## Unit Testing : Jest & Supertest

All test files are inside the folder `/tests`.

```
 PASS  tests/user.test.js
  User Endpoint Tests
    GET /api/user
      ✓ No password :: 400 error (29 ms)
      ✓ Incorrect password :: 401 error (3 ms)
      ✓ Get users list :: 200 success (9 ms)
    POST /api/user
      ✓ No password :: 400 error (3 ms)
      ✓ Incorrect password :: 401 error (3 ms)
      ✓ Create new user {valid password} :: 201 success (37 ms)
      ✓ No password :: 400 error (2 ms)
      ✓ Incorrect password :: 401 error (2 ms)
      ✓ Create new user {password is not valid} :: 400 success (5 ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        0.839 s, estimated 1 s
Ran all test suites.
```

### Unit Test Result Example :

```
  PASS  tests/user.test.js
  User Endpoint Tests
    GET /api/user
      ✓ get :: No password :: 400 error (27 ms)
      ✓ get :: Incorrect password :: 401 error (4 ms)
      ✓ get :: Get users list :: 200 success (9 ms)
    POST /api/user
      ✓ post :: No password :: 400 error (3 ms)
      ✓ post :: Incorrect password :: 401 error (3 ms)
      ✓ post :: Create new user {valid password} :: 201 success (37 ms)
      ✓ post :: No password :: 400 error (4 ms)
      ✓ post :: Incorrect password :: 401 error (3 ms)
      ✓ post :: Create new user {password is not valid} :: 400 success (5 ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        0.923 s, estimated 1 s
Ran all test suites.
```

## Project Structure : MVC (no views)

The project is organized into the following directories: (only user's example)

### Controllers

- **controllers/UserController.js:** Contains the logic for handling user-related routes and interactions with the model.

### Models

- **models/UserModel.js:** Defines the User model that represents user data. It interacts with the data stored in the `data/users.json` file.

### Routes

- **routes/UserRoute.js:** Defines routes for user-related operations, utilizing the `userController` and applying validation using `express-validator`. Please note that validators are some sorts of middleware ==> verification functions (verifyAuth, verifyToken...)

### Data

- **data/users.json:** A JSON file where user data is stored. The `userModel` reads and writes data to this file.

### Validators

- **validators/UserValidator.js:** Defines validation rules for user-related routes using `express-validator`. These rules are used to validate incoming request data.

## How to Run the Project

1. Navigate to the project directory: `cd xxxx`
2. Install dependencies: `npm install`
3. Start the application: `npm start`

## Usage

The project follows the MVC pattern to organize code and responsibilities. It focuses on API-based interactions without views.

### Controllers

Controllers in the `controllers` directory contain route handlers and business logic. They use the `joi` library to validate incoming request data.

### Models

Models in the `models` directory define data structures and interact with data sources. In this project, the `userModel` handles user-related data operations.

### Data

The `data/users.json` file stores user data in JSON format. The `userModel` reads from and writes to this file.

### Validators

The `validators/userValidator.js` file defines validation rules for user-related routes using `joi`.

### Note :

in our case we didn't sanitize the body which means everything sent from the client will be saved in our file , as a result we can use in the controller a sanitizer :

```
// Remove attributes that are not required
const validatedKeys = ['title', 'dateStart', 'dateEnd']; // Add required attributes here

const sanitizedBody = {};
for (const key of validatedKeys) {
if (req.body.hasOwnProperty(key)) {
sanitizedBody[key] = req.body[key];
}
}
```

Or we can select only the attributes required

```
 const id = parseInt(req.params.id)
 //const updatedData = req.body
 //const updatedTask = await model.updateTask(id, updatedData)
 const {dateEnd, etc}
 const updatedTask = await model.updateTask(id,  {dateEnd, etc})
```
