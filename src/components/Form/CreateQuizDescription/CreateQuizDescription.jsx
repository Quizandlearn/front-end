import FormError from "../FormError/FormError";

const getDescriptionError=(formik) => {
    let touched = false;
    if(formik.touched && formik.touched.description) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.questions) {
        return formik.errors.description;
    }
};

const CreateQuizDescription = ({
    formik
}) => {
    const description= formik.values.description;
    const enterDescription = formik.handleChange;
    const touchDescriptionField = formik.handleBlur;
    const descriptionError = getDescriptionError(formik);
    return(
        <>
            <textarea
                name="description"
                className="textarea"
                placeholder="Description"
                rows="4"
                type="text"
                value = {description}
                onChange={enterDescription}
                onBlur={touchDescriptionField}
            />
            {descriptionError ? 
                <FormError errorContent={descriptionError} />
                : null}
        </>
    );
};

export default CreateQuizDescription;