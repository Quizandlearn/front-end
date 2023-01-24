import PropTypes from "prop-types";
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-dupe-keys */

export const authentificationPropTypes = {
  formik: PropTypes.shape({
    errors: PropTypes.shape({
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      confirmedPassword: PropTypes.string.isRequired,
    }),
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    touched: PropTypes.bool,
    values: PropTypes.shape({
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      confirmedPassword: PropTypes.string.isRequired,
    }),
  }),
};

export const createQuizPropTypes = {
  formik: PropTypes.shape({
    errors: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf({
        question: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(
          PropTypes.shape({
            answerContent: PropTypes.string.isRequired,
            answerContent: PropTypes.string.isRequired,
          })
        ),
        eplanation: PropTypes.string,
        learnMore: PropTypes.string,
      }),
    }),
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired,
    values: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          answers: PropTypes.arrayOf(
            PropTypes.shape({
              answerContent: PropTypes.string.isRequired,
              isCorrectAnswer: PropTypes.bool,
            })
          ),
          explanation: PropTypes.string,
          learnMore: PropTypes.string,
        })
      ),
    }),
  }),
};

// answerQuiz propTypes

export const questionsPropTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          isCorrect: PropTypes.bool.isRequired,
          isChecked: PropTypes.bool,
        })
      ),
      explanation: PropTypes.string,
      link_to_learn_more: PropTypes.string,
    })
  ),
};

export const answerPropTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    id_user_owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    questions: questionsPropTypes.questions,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
};

export const resultPropTypes = {
  result: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      questions: questionsPropTypes.questions,
      score: PropTypes.number.isRequired,
    }),
  }),
};
