import ExplainAnswer from '../ExplainAnswer/ExplainAnswer';
import LearnMoreLink from '../LearnMoreLink/LearMoreLink';
import { useState } from 'react';
import PropTypes from "prop-types";

const answerLimit = 4;

const AddQuestionElements = ({
    index,
    formik,
    push
}) => {
    const [showExplanation, setShowExplanation] = useState(false);
    const [showLearnMore, setShowLearnMore] = useState(false);
    const { values } = formik;
    const { questions } = values;
    const question = questions[index];

    return(
        <>
        <div className="buttonContainer add-answer-container">
            <button 
                className="button add-explanation-and-link"
                type="button" 
                value="Ajouter lien ou explication"
                onClick={(e) => setShowExplanation(true)}>
                + Explication
            </button>

            <button 
                className="button add-explanation-and-link"
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
            <ExplainAnswer formik={formik} index={index}/>}

        {showLearnMore === true &&
            <LearnMoreLink formik={formik} index={index}/>} 

        </>
    );
};

AddQuestionElements.propTypes = {
    formik: PropTypes.object
}

export default AddQuestionElements;