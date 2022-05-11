import { FieldArray } from 'formik';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateQuestion from '../CreateQuestion/CreateQuestion';
import CreateAnswer from '../CreateAnswer/CreateAnswer';
import DetermineCorrectAnswer from '../DetermineCorrectAnswer/DetermineCorrectAnswer';
import AddQuestionElements from '../AddQuestionElements/AddQuestionElements';
import PropTypes from "prop-types";

const questionLimit = 5;
const answerMinimum = 2;

const CreateQuestionsAndAnswers = ({
    formik 
}) => {

    return(
        <FieldArray name="questions">
            {({ push, remove }) => (
            <>
                {/* {JSON.stringify(formik.values)} */}
                
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
                        <CreateQuestion formik={formik} index={index}/>
                        <FieldArray name={`questions.${index}.answers`}>
                            {({ push, remove }) => ( 
                                <>
                                {question  && question.answers && question.answers.map((answer, idx)=>(
                                    <div className="answer-and-delete" key={idx}>
                                        <div className="field" id="reply-field">
                                            <CreateAnswer index={index} idx={idx} formik={formik} />
                                            <DetermineCorrectAnswer index={index} idx={idx} formik={formik} />
                                        </div>   
                                        {question && question.answers.length > answerMinimum &&
                                            <button 
                                                className="button remove-answer"
                                                type="button" 
                                                onClick={() => remove(idx)}>
                                                X
                                            </button>}
                                    </div>
                                ))}
                                <AddQuestionElements push={push} index={index} formik={formik} />
                                </>
                            )}
                        </FieldArray>
                    </div>
                ))}
                {(formik.values.questions.length < questionLimit) &&
                    <div className="add-question-button-container">
                        <button 
                            className="button add-question"
                            type="button" 
                            value="Ajouter une question"
                            onClick={() => push({ 
                                question:'', 
                                answers: [
                                    {
                                        answerContent: "",
                                        isCorrectAnswer: false
                                    },
                                    {
                                        answerContent: "",
                                        isCorrectAnswer: false
                                    }
                                ],
                                explanation: "",
                                learnMore: ""
                            })}
                            >
                            + Question
                        </button>
                    </div>}
                </>
            )}  
        </FieldArray>
    );
};

CreateQuestionsAndAnswers.propTypes = {
    formik: PropTypes.object
}

export default CreateQuestionsAndAnswers;