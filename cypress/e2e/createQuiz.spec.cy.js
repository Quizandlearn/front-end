import quiz from "../fixtures/create-quiz.json";

const actionTimeout = 45000;

function fillQuizQuestion(number, question, goodAnswer, wrongAnswer, explanation = undefined, link = undefined) {
  const index = number - 1;
  cy.get(`[id='questions.${index}.question']`).type(question);
  cy.get(`[id='questions.${index}.answers.0.answerContent']`).type(goodAnswer);
  cy.get(`[id='questions.${index}.answers.0.isCorrectAnswer']`).check();
  cy.get(`[id='questions.${index}.answers.1.answerContent']`).type(wrongAnswer);
  if (explanation !== undefined) {
    cy.get("[data-cy=addExplanationButton]").click({ multiple: true });
    cy.get(`textarea[name='questions.${index}.explanation']`).type(explanation);
  }
  if (link !== undefined) {
    cy.get("[data-cy=addLinkButton]").click({ multiple: true });
    cy.get(`input[name='questions.${index}.learnMore']`).type(link);
  }
}

describe("Create Quiz page", () => {
  it("Should create Quiz", () => {
    cy.login();
    cy.get(".menu-items").contains("Créer un quiz", { timeout: actionTimeout }).click();
    cy.get("[data-cy=title]").type(quiz.title);
    cy.get("[data-cy=description]").type(quiz.description);
    cy.get("[data-cy=categories]").select(quiz.category);
    fillQuizQuestion(1, quiz["question-1"], quiz["good-answer-1"], quiz["wrong-answer-1"], quiz["explanation-1"], undefined);
    cy.get("[data-cy=addQuestionButton]").click();
    fillQuizQuestion(2, quiz["question-2"], quiz["good-answer-2"], quiz["wrong-answer-2"], undefined, quiz["link-2"]);
    cy.get("[data-cy=addQuestionButton]").click();
    fillQuizQuestion(3, quiz["question-3"], quiz["good-answer-3"], quiz["wrong-answer-3"], quiz["explanation-3"], quiz["link-3"]);

    // Intercept the POST request BEFORE the request has been send
    cy.intercept({
      method: "POST",
      url: "https://quiet-crag-11269.herokuapp.com/api/quizzes"
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
