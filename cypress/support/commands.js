// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const actionTimeout = 45000;

Cypress.Commands.add("login", () => {
  cy.visit("https://quiz-and-learn-heroku-front.herokuapp.com/", { timeout: actionTimeout });
  cy.get("[data-cy=email]").type(Cypress.env("email"));
  cy.get("[data-cy=password]").type(Cypress.env("password"));
  cy.get("[data-cy=submit]").click();
});
