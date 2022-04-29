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

                <div className="sectionContainer" key={index}>

                    <button 
                        className="button deleteQuestion"
                        type="button" 
                        onClick={() => remove(index)}> 
                    <FontAwesomeIcon icon={faX} className="removeQuestionIcon"/> 
                    </button> 

                    <p className="questionNumber" >Question {index + 1}</p>
                    <CreateQuizQuestion formik={formik} index={index}/>

                    <FieldArray name={`questions.${index}.answers`}>

                        {({ push, remove }) => ( 
                            <>
                            {question  && question.answers && question.answers.map((answer, idx)=>(
                                <div className="answerAndDelete" key={idx}>
                                    <div className="field" id="replyField">
                                        <CreateQuizAnswer index={index} idx={idx} formik={formik} />
                                        <DetermineCorrectAnswer index={index} idx={idx} formik={formik} />
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
                                        <button 
                                            className="button addAnswer"
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
                    }>
                    Ajouter une question
                    </button>}
            </>

        </>
    )}  
    </FieldArray>
            </div>
    );
};

export default CreateQuestionsAndAnswers;