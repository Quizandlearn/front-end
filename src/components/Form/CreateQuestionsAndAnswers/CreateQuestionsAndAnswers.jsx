import { FieldArray } from 'formik';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateQuizQuestion from '../CreateQuizQuestion/CreateQuizQuestion';
import CreateQuizAnswer from '../CreateQuizAnswer/CreateQuizAnswer';
import DetermineCorrectAnswer from '../DetermineCorrectAnswer/DetermineCorrectAnswer';

const questionLimit = 5;
const answerMinimum = 2;
const answerLimit = 4;

/*ajouter 2 champs qui manquent */
const CreateQuestionsAndAnswers = ({ 
    formik 
}) => {

    return(
        <div>
            <FieldArray name="questions">
            {({ push, remove }) => (
                <>
            {/*pour voir les valeurs : */}
            {JSON.stringify(formik.values)}

            {(formik.values.questions.length > 0) &&
            formik.values.questions.map((question, index)=>(

                <div className="section-container" key={index}>

                    <button 
                        className="button delete-question"
                        type="button" 
                        onClick={() => remove(index)}> 
                    <FontAwesomeIcon icon={faX} className="remove-question-icon"/> 
                    </button> 

                    <p className="question-number" >Question {index + 1}</p>
                    <CreateQuizQuestion formik={formik} index={index}/>

                    <FieldArray name={`questions.${index}.answers`}>

                        {({ push, remove }) => ( 
                            <>
                            {question  && question.answers && question.answers.map((answer, idx)=>(
                                <div className="answer-and-delete" key={idx}>
                                    <div className="field" id="reply-field">
                                        <CreateQuizAnswer index={index} idx={idx} formik={formik} />
                                        <DetermineCorrectAnswer index={index} idx={idx} formik={formik} />
                                    </div>                            
                                    {question && question.answers.length > answerMinimum &&
                                    <button 
                                        className="button remove-answer"
                                        type="button" 
                                        onClick={() => remove(idx)}
                                    >X</button>}
                                </div>
                            ))}

                                <div className="buttonContainer add-answer-container">
                                    {question  && question.answers && (question.answers.length < answerLimit) &&
                                        <button 
                                            className="button add-answer"
                                            type="button" 
                                            value="Ajouter une réponse"
                                            onClick={() => push(
                                                { 
                                                    answerContent: "",
                                                    isCorrectAnswer: false
                                                }
                                            )}>
                                                Ajouter une réponse
                                        </button>}
                                </div>  
                            </>
                        )}

                    </FieldArray> 
                </div>
            ))}
            
            <>
                {(formik.values.questions.length < questionLimit) &&
                    <button 
                    className="button add-question"
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
                    }>
                    Ajouter une question
                    </button>
                }
            </>

        </>
    )}  
    </FieldArray>
            </div>
    );
};

export default CreateQuestionsAndAnswers;