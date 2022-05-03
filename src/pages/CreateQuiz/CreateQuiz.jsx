import './CreateQuiz.css';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from "yup";
import SubmitButton from '../../components/Form/SubmitButton/SumbitButton';
import CreateQuizInformation from '../../components/Form/CreateQuizInformation/CreateQuizInformation';
import CreateQuestionsAndAnswers from '../../components/Form/CreateQuestionsAndAnswers/CreateQuestionsAndAnswers';

const QuizCreation = () => {
    const formik = useFormik({
            initialValues: {
                title: "",
                description:"",
                category: "",
                questions: [
                    {
                        hello: "",
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
                            ),
                            explanation: Yup.string()
                            .required("Champ obligatoire"),
                            learnMore: Yup.string()
                                .required("Champ obligatoire")
                        })
                ),
            })
});
    return (
        <div className="quiz-creation-page-container">
            <FormikProvider value={formik}>
            <form id="quiz-creation-form-container">
                <h1 id="title-quiz-creation">Création de Quiz</h1>
                    <CreateQuizInformation formik={formik} />
                    <CreateQuestionsAndAnswers formik={formik} />
                    <div className="form-submit-button-container">
                        <SubmitButton />
                    </div>
            </form>
            </FormikProvider>
        </div>
    );
}

export default QuizCreation;