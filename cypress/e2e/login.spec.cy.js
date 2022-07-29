const actionTimeout = 45000;

describe("Login page", () => {
  it("Should open quizzes pages when success login!", () => {
    cy.login();
    cy.url().should("equal", "https://quiz-and-learn-heroku-front.herokuapp.com/quizzes", { timeout: actionTimeout });
    cy.logout();
  });
  it("Should not open quizzes pages when wrong login!", () => {
    cy.visit("https://quiz-and-learn-heroku-front.herokuapp.com/");
    cy.get("[data-cy=email]").type(Cypress.env("email"));
    cy.get("[data-cy=password]").type("WrongPassword1!");
    cy.get("[data-cy=submit]").click();
  });
});
