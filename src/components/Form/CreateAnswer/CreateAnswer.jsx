import FormError from "../FormError/FormError";

const getFieldValue = (formik, questionIndex, answerIndex)=> {
    if(formik.values && formik.values.questions) {
        const questions = formik.values.questions
        if(questions[questionIndex] && questions[questionIndex].answers) {
            const answers = questions[questionIndex].answers;
            if(answers[answerIndex] && answers[answerIndex].answerContent){
                const answerValue = answers[answerIndex].answerContent;
                return answerValue;
            }
        }
    }
}

const getAnswerError=(formik, questionIndex, answerIndex) => {
    let touched = false;
    if(formik.touched && formik.touched.questions) {
        const questions = formik.touched.questions
        if(questions[questionIndex] && questions[questionIndex].answers) {
            const answers = questions[questionIndex].answers;
            if(answers[answerIndex] && answers[answerIndex].answerContent){
                touched = true;
            }
        }
    }

    if(touched && formik.errors && formik.errors.questions) {
        const questions = formik.errors.questions
        if(questions[questionIndex] && questions[questionIndex].answers) {
            const answers = questions[questionIndex].answers;
            if(answers[answerIndex] && answers[answerIndex].answerContent){
                const answerError = answers[answerIndex].answerContent;
                return answerError;
            }
        }
    }
};

const CreateAnswer = ({
    index,
    idx,
    formik
}) => {
    const fieldName=`questions.${index}.answers.${idx}.answerContent`;
    const fieldValue= getFieldValue(formik, index, idx);
    const answerError = getAnswerError(formik, index, idx);
    const { handleChange, handleBlur } = formik;

    return(
        <div className="field" id="reply-field">
            <label htmlFor={fieldName} className="sr-only"></label>

            <input
                id={fieldName}
                name={fieldName}
                type="text"
                className="input answer"
                maxLength="24"
                placeholder = "réponse"
                value={fieldValue}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {answerError? 
                <FormError errorContent={answerError} />
                : null}
        </div>
    );
};

export default CreateAnswer;