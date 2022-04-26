import './QuizCreation.css';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import * as Yup from "yup";
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubmitButton from '../../components/Form/SubmitButton/SumbitButton';
import FormError from '../../components/Form/FormError/FormError';
import CreateQuizInformation from '../../components/Form/CreateQuizInformation/CreateQuizInformation';

const questionLimit = 5;
const answerMinimum = 2;
const answerLimit = 4;

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
                return answers[answerIndex].answerContent;
            }
        }
    }
};

const QuizCreation = () => {


    //const answerError=formik.touched?.questions && formik.touched?.questions[index] && formik.touched?.questions[index]?.answers && formik.touched?.questions[index]?.answers[idx] && formik.touched.questions[index]?.answers[idx]?.answerContent  && formik.errors?.questions && formik.errors?.questions[index] &&  formik.errors?.questions[index]?.answers[idx] && formik.errors?.questions[index]?.answers[idx]?.answerContent;

    const formik = useFormik({
            initialValues: {
                title: "",
                description:"",
                categories: "",
                questions: [
                    {
                        question: "",
                        answers: [
                            { 
                                answerContent: "",
                                isCorrectAnswer: false
                            },
                            { 
                                answerContent: "",
                                isCorrectAnswer: false
                            }
                        ]
                    }
                ]
            },

            validationSchema: Yup.object({
                title: Yup.string()
                    .required("Champ obligatoire"),
                description: Yup.string()
                    .required("Champ obligatoire"),
                categories: Yup.string()
                    .required("Champ obligatoire"),
                questions: Yup.array().of(
                        Yup.object().shape({
                            question: Yup.string()
                                .required("Champ obligatoire"),
                            answers: Yup.array().of(
                                Yup.object().shape({
                                    answerContent: Yup.string()
                                        .required("Champ obligatoire"),
                                }),
                                Yup.object().shape({
                                    answerContent: Yup.string()
                                        .required("Champ obligatoire"),
                                })
                            )
                        })
                )
            })
});

    return (
        <div className="quizCreationPageContainer">
            <FormikProvider value={formik}>

            <form id="quizCreationFormContainer">

            <h1 id="titleQuizCreation">Création de Quiz</h1>

                <div className="sectionContainer">
                    {/* <CreateQuizTitle 
                        title={formik.values.title} 
                        handleBlur={formik.handleBlur} 
                        handleChange={formik.handleChange} 
                        formikTouched={formik.touched} 
                        formikError={formik.errors}
                    />
                    <CreateQuizDescription 
                        description={formik.values.description} 
                        handleBlur={formik.handleBlur} 
                        handleChange={formik.handleChange} 
                        formikTouched={formik.touched} 
                        formikError={formik.errors}
                    />
                    <SelectQuizCategory 
                        categories={formik.values.categories} 
                        handleBlur={formik.handleBlur} 
                        handleChange={formik.handleChange} 
                        formikTouched={formik.touched} 
                        formikError={formik.errors}/> */}
                        <CreateQuizInformation formik={formik}/>
                </div>

                <FieldArray name="questions">

                    {({ push, remove }) => (
                        <>
                    {/*pour voir les valeurs : */}
                       {JSON.stringify(formik.values)}
                       

                            {(formik.values.questions.length > 0) &&
                            formik.values.questions.map((question, index)=>(

                                <div className="sectionContainer" key={index}>
                                    <button 
                                        className="button deleteQuestion"
                                        type="button" 
                                        onClick={() => remove(index) //Supprimer une question
                                    }> <FontAwesomeIcon icon={faX} className="removeQuestionIcon"/> </button>  
                                    <p className="questionNumber" >Question {index + 1}</p>

                                    <CreateQuestionTitle 
                                        index={index}
                                        formik={formik}
                                    />

                                    <FieldArray name={`questions.${index}.answers`}>

                                        {({ push, remove }) => ( 
                                            <>
                                            {question  && question.answers && question.answers.map((answer, idx)=>{
                                                //const answerContent=formik.values?.questions && formik.values?.questions[index]?.answer && formik.values?.questions[index]?.answers[idx]?.answerContent
                                                //const answerError=formik.touched?.questions && formik.touched?.questions[index] && formik.touched?.questions[index]?.answers && formik.touched?.questions[index]?.answers[idx] && formik.touched.questions[index]?.answers[idx]?.answerContent  && formik.errors?.questions && formik.errors?.questions[index] &&  formik.errors?.questions[index]?.answers[idx] && formik.errors?.questions[index]?.answers[idx]?.answerContent;
                                                const answerError = getAnswerError(formik, index, idx);
                                                
                                                
                                                console.log("formik error", formik.errors)
                                                return (<div className="answerAndDelete" key={idx}>


                                                    {/*Answer*/}
                                                    <div className="field" id="replyField">
                                                        <label htmlFor={`questions.${index}.answers.${idx}.answerContent`} className="sr-only"></label>
                                        
                                                        <input
                                                            id={`questions.${index}.answers.${idx}.answerContent`}
                                                            name={`questions.${index}.answers.${idx}.answerContent`}
                                                            type="text"
                                                            className="input answer"
                                                            maxLength="24"
                                                            placeholder = "réponse"
                                                            value={answer.answerContent}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        {answerError? 
                                                            <FormError errorContent={answerError} />
                                                            : null}

                                                    {/*Checkbox*/}
                                                    <label className="checkbox" htmlFor={`questions.${index}.answers.${idx}.isCorrectAnswer`}>
                                                        <input 
                                                            type="checkbox"
                                                            id={`questions.${index}.answers.${idx}.isCorrectAnswer`}
                                                            name={`questions.${index}.answers.${idx}.isCorrectAnswer`}
                                                            value={formik.values.questions[index].answers[idx].isCorrectAnswer}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        bonne réponse
                                                    </label>
                                                </div>
                                                {question && question.answers.length > answerMinimum &&
                                                <button 
                                                    className="button removeAnswer"
                                                    type="button" 
                                                    onClick={() => remove(idx)}
                                                >X</button>}
                                                        </div>
                                                );
                                            })}

                                            <div className="buttonContainer addAnswerContainer">
                                                {question  && question.answers && (question.answers.length < answerLimit) &&
                                                    <input 
                                                        className="button addAnswer"
                                                        type="button" 
                                                        value="Ajouter une réponse"
                                                        onClick={() => push(
                                                            { 
                                                                answerContent: "",
                                                                isCorrectAnswer: false
                                                            }
                                                        )}
                                                    />}
                                            </div>   
                                            </>
                                        )}

                                    </FieldArray> 
                                </div>
                            ))}
                            
                            <>
                                {(formik.values.questions.length < questionLimit) &&

                                    <input 
                                    className="button addQuestion"
                                    type="button" 
                                    value="Ajouter une question"
                                    onClick={() => push({ 
                                        question:'', 
                                        answers:[
                                            {
                                                answerContent: "",
                                                isCorrectAnswer: false
                                            },
                                            {
                                                answerContent: "",
                                                isCorrectAnswer: false
                                            }
                                        ] 
                                    })
                                    }

                                />}
                            </>

                        </>
                    )}  
                </FieldArray>

                <SubmitButton />

            </form>
            </FormikProvider>

        </div>
    );
}

export default QuizCreation;

const CreateQuizTitle = ({
    title, 
    handleChange, 
    handleBlur, 
    formikError, 
    formikTouched
}) => {
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
            {formikTouched.title && formikError.title ? 
                <FormError errorContent={formikError.title} />
            : null}
        </>
    );
};

const CreateQuizDescription = ({ 
    description, 
    handleChange, 
    handleBlur, 
    formikError, 
    formikTouched
}) => {
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
                >
            </textarea>
            {formikTouched.description && formikError.description ? 
                <FormError errorContent={formikError.description} />
                : null}
        </>
    );
};

const SelectQuizCategory = ({
    categories, 
    handleChange, 
    handleBlur, 
    formikError, 
    formikTouched
}) => {
    return(
        <div className="select is-warning" id="selectCategoriesContainer">
                    <select 
                        id="selectCategories" 
                        name="categories"
                        value= {categories}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option value="" disabled>Thématique</option>
                        <option value="tech">Tech</option>
                        <option value="feminisme">Feminisme</option>
                        <option value="ecologie">Ecologie</option>
                    </select>
                    {formikTouched.categories && formikError.categories ? 
                    <FormError errorContent={formikError.categories} />
                    : null}
        </div>
    );
};

/*-------------------*/
const CreateQuestionTitle = ({
    index,
    formik
}) => {
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