import FormError from "../FormError/FormError";
import PropTypes from "prop-types";

const getExplanationError = (formik) => {
    let touched = false;
    if(formik.touched && formik.touched.explanation) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.explanation) {
        return formik.errors.explanation;
    }
};

const ExplainAnswer = ({
    formik
}) => {
    const explanationError = getExplanationError(formik);
    const { handleChange, handleBlur, values } = formik;
    const { explanation } = values;

    return(
        <>
            <textarea
                name="description"
                className="textarea"
                placeholder="Description"
                rows="4"
                type="text"
                value = {explanation}
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