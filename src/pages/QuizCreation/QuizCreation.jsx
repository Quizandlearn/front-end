import './QuizCreation.css';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import * as Yup from "yup";
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubmitButton from '../../components/Form/SubmitButton/SumbitButton';
import CreateQuizInformation from '../../components/Form/CreateQuizInformation/CreateQuizInformation';

import CreateQuizQuestion from '../../components/Form/CreateQuizQuestion/CreateQuizQuestion';
import CreateQuizAnswer from '../../components/Form/CreateQuizAnswer/CreateQuizAnswer';
import DetermineCorrectAnswer from '../../components/Form/DetermineCorrectAnswer/DetermineCorrectAnswer';

const questionLimit = 5;
const answerMinimum = 2;
const answerLimit = 4;

const QuizCreation = () => {
    const formik = useFormik({
            initialValues: {
                title: "",
                description:"",
                category: "",
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
                category: Yup.string()
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

                    <CreateQuizInformation formik={formik}/>
                    
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

                                    <CreateQuizQuestion formik={formik} index={index}/>

                                    <FieldArray name={`questions.${index}.answers`}>

                                        {({ push, remove }) => ( 
                                            <>
                                            {question  && question.answers && question.answers.map((answer, idx)=>(
                                                <div className="answerAndDelete" key={idx}>
                                                    
                                                    <CreateQuizAnswer index={index} idx={idx} formik={formik} />
                                                    <DetermineCorrectAnswer index={index} idx={idx} formik={formik} />
                                                    
                                                
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