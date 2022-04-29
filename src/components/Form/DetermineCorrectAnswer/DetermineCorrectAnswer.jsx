const getFieldValue = (formik, questionIndex, answerIndex)=> {
    if(formik.values && formik.values.questions) {
        const questions = formik.values.questions
        if(questions[questionIndex] && questions[questionIndex].answers) {
            const answers = questions[questionIndex].answers;
            if(answers[answerIndex] && answers[answerIndex].isCorrectAnswer){
                const isCorrectAnswer = answers[answerIndex].isCorrectAnswer;
                return isCorrectAnswer;
            }
        }
    }
}


const DetermineCorrectAnswer = ({
    index,
    idx,
    formik
}) => {
    const fieldName = `questions.${index}.answers.${idx}.isCorrectAnswer`;
    const fieldValue= getFieldValue(formik, index, idx);
    const { handleChange, handleBlur } = formik;

    return(
       
       <label className="checkbox" htmlFor={fieldName}>
            <input 
                type="checkbox"
                id={fieldName}
                name={fieldName}
                value={fieldValue}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            bonne réponse
        </label> 
    );
};

export default DetermineCorrectAnswer;