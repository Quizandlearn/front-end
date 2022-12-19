const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://quiz-and-learn-heroku-front.herokuapp.com/"
  },
});
