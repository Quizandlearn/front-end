import { FieldArray } from 'formik';
import { useState } from 'react';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateQuestion from '../CreateQuestion/CreateQuestion';
import CreateAnswer from '../CreateAnswer/CreateAnswer';
import DetermineCorrectAnswer from '../DetermineCorrectAnswer/DetermineCorrectAnswer';
import ExplainAnswer from '../ExplainAnswer/ExplainAnswer';
import LearnMoreLink from '../LearnMoreLink/LearMoreLink';
import PropTypes from "prop-types";


const questionLimit = 5;
const answerMinimum = 2;
const answerLimit = 4;

const CreateQuestionsAndAnswers = ({
    formik 
}) => {
    const [showExplanation, setShowExplanation] = useState(false);
    const [showLearnMore, setShowLearnMore] = useState(false);

    return(
        <div>
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
                                                onClick={() => remove(idx)}
                                            >X</button>}
                                        </div>
                                    ))}
                                        <div className="buttonContainer add-answer-container">
                                            <button 
                                                className="button add-explanation"
                                                type="button" 
                                                value="Ajouter lien ou explication"
                                                onClick={(e) => setShowExplanation(true)}>
                                                    + Explication
                                            </button>
                                            <button 
                                                className="button add-explanation"
                                                type="button" 
                                                value="Ajouter lien ou explication"
                                                onClick={(e) => setShowLearnMore(true)}>
                                                    + Lien d'approfondissement
                                            </button>
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
                                                        + Réponse
                                                </button>}
                                            
                                        </div>

                                        {showExplanation === true &&
                                            <ExplainAnswer formik={formik} />}

                                        {showLearnMore === true &&
                                            <LearnMoreLink formik={formik} />}

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
                                    + Question
                                </button>
                            }
                        </>
                    </>
                )}  
            </FieldArray>
        </div>
    );
};

CreateQuestionsAndAnswers.propTypes = {
    formik: PropTypes.object
}

export default CreateQuestionsAndAnswers;