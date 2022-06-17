import PropTypes from "prop-types";
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-dupe-keys */

export const authentificationPropTypes = {
  formik: PropTypes.shape({
    dirty: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      confirmedPassword: PropTypes.string.isRequired
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
      confirmedPassword: PropTypes.string.isRequired
    })
  })
};

export const createQuizPropTypes = {
  formik: PropTypes.shape({
    dirty: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf({
        question: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(PropTypes.shape({
          answerContent: PropTypes.string.isRequired,
          answerContent: PropTypes.string.isRequired
        })),
        eplanation: PropTypes.string,
        learnMore: PropTypes.string
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
      questions: PropTypes.arrayOf(PropTypes.shape({
        question: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(PropTypes.shape({
          answerContent: PropTypes.string.isRequired,
          isCorrectAnswer: PropTypes.bool
        })),
        explanation: PropTypes.string,
        learnMore: PropTypes.string
      }))
    })
  })
};
