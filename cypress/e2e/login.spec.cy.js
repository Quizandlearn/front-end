const actionTimeout = 45000;

describe("Login page", () => {
  it("Should open quizzes pages when success login!", () => {
    cy.login();
    cy.url().should("equal", "http://localhost:3000/quizzes", { timeout: actionTimeout });
    cy.logout();
  });
  it("Should not open quizzes pages when wrong login!", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=email]").type(Cypress.env("email"));
    cy.get("[data-cy=password]").type("WrongPassword1!");
    cy.get("[data-cy=submit]").click();
  });
});
