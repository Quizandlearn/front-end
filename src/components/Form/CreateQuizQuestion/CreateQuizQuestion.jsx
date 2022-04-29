import FormError from "../FormError/FormError";

const getFieldValue = (formik, questionIndex) => {
    if(formik.values && formik.values.questions) {
        const questions = formik.values.questions;
        if(questions[questionIndex] && questions[questionIndex].question){
            const questionValue = questions[questionIndex].question;
            return questionValue;
        }
    }
};

const getQuestionError = (formik, questionIndex) => {
    let touched = false;
    if(formik.touched && formik.touched.questions) {
        const questions = formik.touched.questions
        if(questions[questionIndex] && questions[questionIndex].question) {
            touched = true;
        }
    }

    if(touched && formik.errors && formik.errors.questions) {
        const questions = formik.errors.questions;
        if(questions[questionIndex] && questions[questionIndex].question) {
            const questionError =  questions[questionIndex].question;
            return questionError;
        }
    }
};

const CreateQuizQuestion = ({
    index,
    formik
}) => {
    const fieldName=`questions.${index}.question`;
    const fieldValue= getFieldValue(formik, index);
    const questionError = getQuestionError(formik, index);
    const { handleChange, handleBlur } = formik;

    return(
        <div className="field">
            <label htmlFor={fieldName} className="sr-only"></label>
            <input
                id={fieldName}
                name={fieldName}
                type="text"
                className="input"
                maxLength="24"
                placeholder = "Titre Question"
                value={fieldValue}
                onChange={handleChange}
                onBlur={handleBlur}
            />
           {questionError ? 
                <FormError errorContent={questionError} />
                : null}
        </div> 
    );
};

export default CreateQuizQuestion;