import './CreateQuiz.css';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from "yup";
import SubmitButton from '../../components/Quiz/SubmitButton/SumbitButton';
import CreateQuizInformation from '../../components/Quiz/CreateQuizInformation/CreateQuizInformation';
import CreateQuestionsAndAnswers from '../../components/Quiz/CreateQuestionsAndAnswers/CreateQuestionsAndAnswers';

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
                        ],
                        explanation: "",
                        learnMore: ""
                    }
                ]
            },
            validationSchema: Yup.object({
                title: Yup.string()
                    .required("Champ obligatoire")
                    .max(80, "Titre trop long: 80 caractères maximum"),
                description: Yup.string()
                    .required("Champ obligatoire")
                    .max(400, "Description trop longue: 400 caractères maximum"),
                category: Yup.string()
                    .required("Champ obligatoire"),
                questions: Yup.array().of(
                        Yup.object().shape({
                            question: Yup.string()
                                .required("Champ obligatoire")
                                .max(150, "Question trop longue: 150 caractères maximum"),
                            answers: Yup.array().of(
                                Yup.object().shape({
                                    answerContent: Yup.string()
                                        .required("Champ obligatoire")
                                        .max(150, "Réponse trop longue: 150 caractères maximum"),
                                }),
                                Yup.object().shape({
                                    answerContent: Yup.string()
                                        .required("Champ obligatoire")
                                        .max(150, "Réponse trop longue: 150 caractères maximum"),
                                })
                            ),
                            explanation: Yup.string()
                                .max(400,"Explication trop longue: 400 caractères maximum"),
                            learnMore: Yup.string()
                                .url("Veuillez entrer une URL valide commençant par https://")
                        })
                ),
            })
});
    return (
        <div className="quiz-creation-page-container">
            <FormikProvider value={formik}>
                <form className="quiz-creation-form-container">
                    <h1 className="title-quiz-creation">Création de Quiz</h1>
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