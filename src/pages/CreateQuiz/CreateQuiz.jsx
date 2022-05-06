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
                    .max(80, "Le titre doit contenir au maximum 80 carcactères"),
                description: Yup.string()
                    .required("Champ obligatoire")
                    .max(400, "La description doit contenir au maximum 400 carcactères"),
                category: Yup.string()
                    .required("Champ obligatoire"),
                questions: Yup.array().of(
                        Yup.object().shape({
                            question: Yup.string()
                                .required("Champ obligatoire")
                                .max(150, ""),
                            answers: Yup.array().of(
                                Yup.object().shape({
                                    answerContent: Yup.string()
                                        .required("Champ obligatoire")
                                        .max(150, "La réponse doit contenir au maximum 150 carcactères"),
                                }),
                                Yup.object().shape({
                                    answerContent: Yup.string()
                                        .required("Champ obligatoire")
                                        .max(150, "La réponse doit contenir au maximum 150 carcactères"),
                                })
                            ),
                            explanation: Yup.string()
                                .max(400,"L'explication doit contenir au maximum 400 carcactères"),
                            learnMore: Yup.string()
                                .url("L'URL doit commencer par https://")
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