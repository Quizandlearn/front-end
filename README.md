# Quizandlearn backend

[![Build status](../../workflows/CI/badge.svg)](../../actions?query=workflow%3ACI)

**Quizandlearn** is a collaborative quizzes plateform based on NodeJs and React.js.


## Prerequisites

**Quizandlearn** requires `node 16.9.1` with `npm 7.21.1`*

## Installation

1. Clone the repository
2. Add a new `.env` file.

```
MONGODB_URI= "mongodb+srv:// login / credentials "
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:4000"}
```

3. Install dependencies

```
$ npm install
```

4. Run server

```
$ npm start
```

### Testing

To run tests

```
$ npm test
```

### Linter

**Quizandlearn** follows the [Airbnb style guide](https://github.com/airbnb/javascript).
To help us we use [ESLint](https://eslint.org/) as a linter:

```
$ npm lint
```
To automatically fix  what can be:
```
npm run lint -- --fix
```

## Deployment

**Quizandlearn** is deployed automatically on pull request on a heroku server at https://quiz-and-learn-heroku-front.herokuapp.com/
