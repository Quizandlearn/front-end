import quiz from "../fixtures/create-quiz.json";

describe("Create Quiz page", () => {
  it("Should create Quiz", () => {
    cy.login();
    cy.get("[data-cy=create-quizz]").click();
    cy.get("[data-cy=title]").type(quiz.title);
    cy.get("[data-cy=description]").type(quiz.description);
    cy.get("[data-cy=categories]").select(quiz.category);
    cy.get("[data-cy=question]").type(quiz.question);
    cy.get("[id='questions.0.answers.0.answerContent']").type(quiz.answer);
    cy.get("[id='questions.0.answers.0.isCorrectAnswer']").check();
    cy.get("[id='questions.0.answers.1.answerContent']").type(quiz.fail);
    cy.get("[id='questions.0.answers.1.isCorrectAnswer']").check();

    // Intercept the POST request BEFORE the request has been send
    cy.intercept({
      method: "POST",
      url: "http://localhost:4000/api/quizzes"
    }).as("quizzes");

    // Submit
    cy.get("[data-cy=submit]").click();

    // check that the quizz has been created
    cy.wait("@quizzes").then((interception) => {
      const { message } = interception.response.body;
      expect(message).to.eq("Quiz créé");
    });
  });
});
