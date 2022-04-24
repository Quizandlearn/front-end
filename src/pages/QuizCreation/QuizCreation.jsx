import './QuizCreation.css';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubmitButton from '../../components/SubmitButton/SumbitButton';

const questionLimit = 5;
const answerMinimum = 2;
const answerLimit = 4;

const QuizCreation = () => {

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
            }
        });

    return (
        <div className="quizCreationPageContainer">
            <FormikProvider value={formik}>

            <form id="quizCreationFormContainer">

            <h1 id="titleQuizCreation">Création de Quiz</h1>

                <div className="sectionContainer">
                    {/*Title*/}
                    <div className="field">
                        <label htmlFor="title" className="sr-only">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="input"
                            value = {formik.values.title}
                            maxLength="24"
                            placeholder = "Titre questionnaire"
                            required
                        />
                    </div>

                    {/*Description*/}
                    <textarea
                        name="description"
                        className="textarea"
                        placeholder="Description"
                        rows="4"
                        type="text"
                        value = {formik.values.description}
                        required
                        >
                    </textarea>

                    {/*Select*/}
                    <div className="select is-warning" id="selectCategoriesContainer">
                        <select 
                            id="selectCategories" 
                            name="categories"
                            value= {formik.values.categories}
                            required
                        >
                            <option value="" disabled>Thématique</option>
                            <option value="tech">Tech</option>
                            <option value="feminisme">Feminisme</option>
                            <option value="ecologie">Ecologie</option>
                        </select>
                    </div>
                    
                </div>

                <FieldArray name="questions">

                    {({ push, remove }) => (
                        <>
                    {/*pour voir les valeurs : */}
                       {JSON.stringify(formik.values.questions)}

                            {(formik.values.questions.length > 0) &&
                            formik.values.questions.map((question, index)=>(

                                <div className="sectionContainer" key={index}>
                                    <button 
                                        className="button deleteQuestion"
                                        type="button" 
                                        onClick={() => remove(index) //Supprimer une question
                                    }> <FontAwesomeIcon icon={faX} className="removeQuestionIcon"/> </button>  
                                    <p className="questionNumber" >Question {index + 1}</p>

                                    {/*Question Title*/}
                                    <div className="field">
                                        <label htmlFor={`questions.${index}.question`} className="sr-only"></label>
                                        <input
                                            id={`questions.${index}.question`}
                                            name={`questions.${index}.question`}
                                            type="text"
                                            className="input"
                                            maxLength="24"
                                            placeholder = "Titre Question"
                                            value={formik.values.questions[index].question}
                                            onChange={formik.handleChange}
                                            required
                                        />
                                    </div>

                                    <FieldArray name={`questions.${index}.answers`}>

                                        {({ push, remove }) => ( 
                                            <>
                                            {question  && question.answers && question.answers.map((answerContent, idx)=>(
                                                <div className="answerAndDelete" key={idx}>
                                                <div className="field" id="replyField">
                                                    <label htmlFor={`questions.${index}.answers.${idx}.answerContent`} className="sr-only"></label>
                                                    <input
                                                        id={`questions.${index}.answers.${idx}.answerContent`}
                                                        name={`questions.${index}.answers.${idx}.answerContent`}
                                                        type="text"
                                                        className="input answer"
                                                        maxLength="24"
                                                        placeholder = "réponse"
                                                        value={formik.values.questions[index].answers[idx].answerContent}
                                                        onChange={formik.handleChange}
                                                        required
                                                    />

                                                    <label class="checkbox" htmlFor={`questions.${index}.answers.${idx}.isCorrectAnswer`}>
                                                        <input 
                                                            type="checkbox"
                                                            id={`questions.${index}.answers.${idx}.isCorrectAnswer`}
                                                            name={`questions.${index}.answers.${idx}.isCorrectAnswer`}
                                                            value={formik.values.questions[index].answers[idx].isCorrectAnswer}
                                                            onChange={formik.handleChange}
                                                            required
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
                                            ))}

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