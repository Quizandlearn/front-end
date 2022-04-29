import FormError from "../FormError/FormError";

const getTitleError = (formik) => {
    let touched = false;
    if(formik.touched && formik.touched.title) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.title) {
        return formik.errors.title;
    }
};

const CreateTitle = ({
    formik
}) => {
    const titleError = getTitleError(formik);
    const { handleChange, handleBlur, values } = formik;
    const { title } = values;

    return(
        <>
            <label htmlFor="title" className="sr-only">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    className="input"
                    value = {title}
                    maxLength="24"
                    placeholder = "Titre questionnaire"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            {titleError ? 
                <FormError errorContent={titleError} />
                : null}
        </>
    );
};

export default CreateTitle;