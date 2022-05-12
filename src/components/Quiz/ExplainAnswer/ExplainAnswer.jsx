import FormError from "../../Common/FormError/FormError";
import PropTypes from "prop-types";

const getFieldValue = (formik, questionIndex) => {
    if(formik.values && formik.values.questions) {
        const questions = formik.values.questions;
        if(questions[questionIndex] && questions[questionIndex].explanation){
            const explanationValue = questions[questionIndex].explanation;
            return explanationValue;
        }
    }
};

const getExplanationError = (formik, questionIndex) => {
    let touched = false;
    if(formik.touched && formik.touched.questions) {
        const questions = formik.touched.questions
        if(questions[questionIndex] && questions[questionIndex].explanation) {
            touched = true;
        }
    }

    if(touched && formik.errors && formik.errors.questions) {
        const questions = formik.errors.questions;
        if(questions[questionIndex] && questions[questionIndex].explanation) {
            const explanationError =  questions[questionIndex].explanation;
            return explanationError;
        }
    }
};

const ExplainAnswer = ({
    formik,
    index
}) => {
    const fieldName = `questions.${index}.explanation`;
    const fieldValue = getFieldValue(formik, index);
    const explanationError = getExplanationError(formik, index);
    const { handleChange, handleBlur } = formik;

    return(
        <>
            <textarea
                name={fieldName}
                className="textarea"
                placeholder="Explication des réponses"
                rows="4"
                type="text"
                value = {fieldValue}
                onChange={handleChange}
                onBlur={handleBlur}
            />
           {explanationError ? 
                <FormError errorContent={explanationError} />
                : null}
        </>
    );
};

ExplainAnswer.propTypes = {
    formik: PropTypes.object
}

export default ExplainAnswer;