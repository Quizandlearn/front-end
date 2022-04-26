import FormError from "../FormError/FormError";

const getTitleError=(formik) => {
    let touched = false;
    if(formik.touched && formik.touched.title) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.title) {
        return formik.errors.title;
    }
};

const CreateQuizTitle = ({
    formik
}) => {
    const title= formik.values.title;
    const enterTitle = formik.handleChange;
    const touchTitleField = formik.handleBlur;
    const titleError = getTitleError(formik);
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
                    onChange={enterTitle}
                    onBlur={touchTitleField}
                />
            {titleError ? 
                <FormError errorContent={titleError} />
                : null}
        </>
    );
};

export default CreateQuizTitle;