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

const CreateDescription = ({
    formik
}) => {
    const { handleChange, handleBlur, values} = formik;
    const { description } = values;
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
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {descriptionError ? 
                <FormError errorContent={descriptionError} />
                : null}
        </>
    );
};

export default CreateDescription;