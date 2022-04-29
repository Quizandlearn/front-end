import FormError from "../FormError/FormError";
import PropTypes from "prop-types";

const getLearnMoreError = (formik) => {
    let touched = false;
    if(formik.touched && formik.touched.learnMore) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.learnMore) {
        return formik.errors.learnMore;
    }
};

const LearnMoreLink = ({
    formik
}) => {
    const learnMoreError = getLearnMoreError(formik);
    const { handleChange, handleBlur, values } = formik;
    const { learnMore } = values;

    return(
        <div className="field">
            <label htmlFor="learnMore" className="sr-only"></label>
            <input
                id="learnMore"
                name="learnMore"
                type="text"
                className="input"
                maxLength="24"
                placeholder = "Lien d'approfondissement commençant par https://"
                value={learnMore}
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