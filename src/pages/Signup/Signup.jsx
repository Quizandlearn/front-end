import './Signup.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoBlue from '../../assets/logoBlue.png';
import EnterName from '../../components/User/EnterName/EnterName';
import EnterSurname from '../../components/User/EnterSurname/EnterSurname';
import EnterEmail from "../../components/User/EnterEmail/EnterEmail";
import EnterPassword from "../../components/User/EnterPassword/EnterPassword";
import EnterConfirmedPassword from '../../components/User/EnterConfirmedPassword/EnterConfirmedPassword';
import Button from '../../components/User/Button/Button';
import { useSignUp } from "../../hooks/useSignUp";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL_FRONTEND = '/';
const Inscription = "Inscription";

const Signup = () => {
    const { signup } = useSignUp();
    const [errMsg, setErrMsg] = useState('');

    const formik = useFormik({
        initialValues: {
            name: "",
            surname : "",
            email: "",
            password: "",
            confirmedPassword: ""
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .max(45, "Prénom invalide")
                .required("Champ obligatoire"),
            surname: Yup.string()
                .max(45, "Nom invalide")
                .required("Champ obligatoire"),
            email: Yup.string()
                .email("Adress email invalide")
                .required("Champ obligatoire"),
            password: Yup.string()
                .matches(PASSWORD_REGEX, 'Le mot de passe doit contenir au minimum 8 caractères : au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre')
                .required("Champ obligatoire"),
            confirmedPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Les mots de passe saisis ne sont pas idéntiques')
                .required("Champ obligatoire")
        }),

         onSubmit: async (values) => {
                signup(values, (message) => {
                setErrMsg(message);
            });
        }
    });

    return(
        <div id="page-sign-up-container">
             <section id="sign-up-container">
                    <img src={LogoBlue} id="logo-sign-up" alt=""></img>  
                    <h1 id="sign-up-titre">S'inscrire</h1>
                        <form onSubmit={formik.handleSubmit} className="form-sign-up">
                            <EnterName formik={formik} />
                            <EnterSurname formik={formik} />
                            <EnterEmail formik={formik}/>
                            <EnterPassword formik={formik} />
                            <EnterConfirmedPassword formik={formik} />
                            <Button value={Inscription} />
                        </form>
                    <p id="account-question">Vous avez déjà un compte ?</p> 
                    < Link to={LOGIN_URL_FRONTEND} id="link-to-signin-page"> Connectez-vous</Link>
            </section>
        </div>     
    );
}

export default Signup;

       
       