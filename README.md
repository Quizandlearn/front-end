# Quizandlearn front-end

[![Build status](../../workflows/CI/badge.svg)](../../actions?query=workflow%3ACI)

**Quizandlearn** is an app where people can gain or share knowledge by creating or replying to quizzes (Node/React).


## Prerequisites

**Quizandlearn** requires `react 17.0.2` with `npm 7.21.1`*

## Installation

1. Clone the repository
2. Add a new `.env` file.

```
REACT_APP_API_URL="http://localhost:4000"
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

To run tests, create cypress.env.json file with credentials
Open Cypress interface with the following command:

```
npx cypress open
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

## Docker

With Dockerfile written, build the image using the following command:
```
$ docker build
```

Otherwise the docker image is built on every push to the repository
