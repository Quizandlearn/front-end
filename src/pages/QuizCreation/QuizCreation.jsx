import './QuizCreation.css';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from "yup";
import SubmitButton from '../../components/Form/SubmitButton/SumbitButton';
import CreateQuizInformation from '../../components/Form/CreateQuizInformation/CreateQuizInformation';
import CreateQuizQuestionsAndAnswers from '../../components/Form/CreateQuestionsAndAnswers/CreateQuestionsAndAnswers'

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
                    <CreateQuizInformation formik={formik} />
                    <CreateQuizQuestionsAndAnswers formik={formik} />
                <SubmitButton />
            </form>
            </FormikProvider>
        </div>
    );
}

export default QuizCreation;