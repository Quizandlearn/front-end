import FormError from "../FormError/FormError";
import PropTypes from "prop-types";

const getLearnMoreValue = (formik, questionIndex) => {
    if(formik.values && formik.values.questions) {
        const questions = formik.values.questions;
        if(questions[questionIndex] && questions[questionIndex].learnMore){
            const learnMoreValue = questions[questionIndex].learnMore;
            return learnMoreValue;
        }
    }
}; 
const getLearnMoreError = (formik, questionIndex) => {
    let touched = false;
    if(formik.touched && formik.touched.questions) {
        const questions = formik.touched.questions
        if(questions[questionIndex] && questions[questionIndex].learnMore) {
            touched = true;
        }
    }

    if(touched && formik.errors && formik.errors.questions) {
        const questions = formik.errors.questions;
        if(questions[questionIndex] && questions[questionIndex].learnMore) {
            const learnMoreError =  questions[questionIndex].learnMore;
            return learnMoreError;
        }
    }
};

const LearnMoreLink = ({
    formik,
    index
}) => {
    const fieldName=`questions.${index}.learnMore`;
    const fieldValue= getLearnMoreValue(formik, index);
    const learnMoreError = getLearnMoreError(formik, index);
    const { handleChange, handleBlur } = formik;

    return(
        <div className="field">
            <label htmlFor={fieldName} className="sr-only"></label>
            <input
                id="learnMore"
                name={fieldName}
                type="text"
                className="input learn-more"
                maxLength="24"
                placeholder = "Lien d'approfondissement commençant par https://"
                value={fieldValue}
                onChange={handleChange}
                onBlur={handleBlur}
            />
           {learnMoreError ? 
                <FormError errorContent={learnMoreError} />
                : null}
        </div>
    );
};

LearnMoreLink.propTypes = {
    formik: PropTypes.object
}

export default LearnMoreLink;