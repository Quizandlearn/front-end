import FormError from "../FormError/FormError";

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
            const error =  questions[questionIndex].question;
            return error;
        }
    }
};

const CreateQuizQuestion = ({
    index,
    formik
}) => {
/*     const fieldName=`questions.${index}.question`;
    const fieldValue=formik.values?.questions && formik.values?.questions[index]?.question;
    const questionError = getQuestionError(formik, index);
    const enterQuestion = formik.handleChange;
    const touchQuestionField = formik.handleBlur;
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
                onChange={enterQuestion}
                onBlur={touchQuestionField}
            />
           {questionError ? 
                <FormError errorContent={questionError} />
                : null}
        </div> */
    
        const formikTouchedQuestionsObject=formik.touched?.questions;
        const formikTouchedQuestionArray= formik.touched?.questions && formik.touched?.questions[index];
        const formikTouchedQuestionTitle=formik.touched?.questions && formik.touched?.questions[index]?.question;
        const formikErrorQuestionsObject=formik.errors?.questions;
        const formikErrorQuestionArray=formik.errors?.questions && formik.errors?.questions[index];
        const formikErrorQuestionTitle=formik.errors?.questions && formik.errors?.questions[index]?.question;
        const fieldName=`questions.${index}.question`;
        const fieldValue=formik.values?.questions && formik.values?.questions[index]?.question;
        
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
               { formikTouchedQuestionTitle && formikErrorQuestionTitle ? 
                    <FormError errorContent={formikErrorQuestionTitle} />
                    : null}
            </div>
    );
};

export default CreateQuizQuestion;