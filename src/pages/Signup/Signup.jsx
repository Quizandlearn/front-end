import './Signup.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { faInfoCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoBlue from '../../assets/logoBlue.png';
import { useSignUp } from "../../hooks/useSignUp";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL_FRONTEND = '/';

const Signup = () => {
    const { signup } = useSignUp();
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const formik = useFormik({

        initialValues: {
            name: "",
            surname : "",
            email: "",
            password: "",
            confirmPassword: ""
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
            confirmPassword: Yup.string()
                /*oneOf = equals to*/ 
                .oneOf([Yup.ref('password'), null], 'Les mots de passe saisis ne sont pas idéntiques')
                .required("Champ obligatoire")
        }),

         onSubmit: async (values) => {
                signup(values, (message) => {
                setErrMsg(message);
            });
        }
    });

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmedPasswordVisiblity = () => {
        setConfirmedPasswordShown(!confirmedPasswordShown);
    };

    return(
        <div id="page-sign-up-container">

             <section id="sign-up-container">
                    <img src={LogoBlue} id="logo-sign-up" alt=""></img>  
                    <h1 id="sign-up-titre">S'inscrire</h1>
                    <br/>

                    <form onSubmit={formik.handleSubmit} className="form-sign-up">

                    <div>
                        
                    </div>
                        <div className="field sign-up-field">
                            <label htmlFor="name" className="sr-only">Prénom*</label>
                                <input 
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="on"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.name}
                                    className="input"
                                    placeholder = "Prénom"  
                                />

                            {formik.touched.name && formik.errors.name ?

                                <span className="error-message-sign-up">
                                    <FontAwesomeIcon icon={faInfoCircle} className="error-icon-sign-up" /> 
                                    <p className="error-content-sign-up">{formik.errors.name}</p> 
                                </span> : null}
                        </div>

                        <div className="field sign-up-field">
                            <label htmlFor="nom" className="sr-only">Nom</label>
                                <input 
                                    id="nom"
                                    name="surname"
                                    type="text"
                                    className="input"
                                    autoComplete="on"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.surname}
                                    placeholder="Nom"
                                />

                                {formik.touched.surname && formik.errors.surname ? 

                                    <span className="error-message-sign-up">
                                        <FontAwesomeIcon icon={faInfoCircle} className="error-icon-sign-up" /> 
                                        <p className="error-content-sign-up">{formik.errors.surname}</p>
                                    </span> : null}
                        </div>

                        <div className="field sign-up-field">
                            <label htmlFor="email" className="sr-only">E-mail</label>
                                <input 
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="input"
                                    autoComplete="on" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.email}
                                    placeholder="E-mail"
                                />

                                {formik.touched.email && formik.errors.email ? 

                                    <span className="error-message-sign-up">
                                        <FontAwesomeIcon icon={faInfoCircle} className="error-icon-sign-up" /> 
                                        <p className="error-content-sign-up">{formik.errors.email}</p>
                                    </span> : null}
                        </div>

                        <div className="field password-container">
                            <label htmlFor="password"></label>
                                <input 
                                    id="password"
                                    name="password"
                                    autoComplete="on"
                                    type={passwordShown ? "text" : "password"}
                                    className="input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.password}
                                    placeholder="Mot de passe"
                                />

                                <button onClick={togglePasswordVisiblity} className="password-eye-sign-up">
                                    <FontAwesomeIcon icon={faEye} className="eye-sign-up"/>
                                </button>
                                
                                {formik.touched.password && formik.errors.password ? 

                                    <span className="error-message-sign-up">
                                        <FontAwesomeIcon icon={faInfoCircle} className="error-icon-sign-up" /> 
                                        <p className="error-content-sign-up">{formik.errors.password}</p>
                                    </span> : null}
                        </div>

                        <div className="field password-container">
                            <label htmlFor="password-confirmation" className="sr-only">Confirmation du mot de passe</label>
                                <input 
                                    id="password-confirmation"
                                    name="confirmPassword"
                                    type={confirmedPasswordShown ? "text" : "password"}
                                    className="input"
                                    autoComplete="on" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.confirmPassword}
                                    placeholder="Confirmation mot de passe"
                                />
                                
                                <button onClick={toggleConfirmedPasswordVisiblity} className="password-eye-sign-up">
                                    <FontAwesomeIcon icon={faEye} className="eye-sign-up"/>
                                </button>

                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? 

                                    <span className="error-message-sign-up">
                                        <FontAwesomeIcon icon={faInfoCircle} className="error-icon-sign-up" />  
                                        <p className="error-content-sign-up">{formik.errors.confirmPassword}</p>
                                    </span> : null}
                                
                            {errMsg && 
                                <span className="error-message-sign-up">
                                    <FontAwesomeIcon icon={faInfoCircle} className="error-icon-sign-up" />  
                                    <p className="error-content-sign-up">{errMsg}</p>
                                </span>}
                        </div>
                        
                        <div className="button-container signup-submit">
                            <input 
                                className={"button signup-submit-button"}
                                type="submit" 
                                value="Inscription"
                            />
                        </div>
                        <br/>
                </form>
                    <p id="account-question">Vous avez déjà un compte ?</p> 
                    < Link to={LOGIN_URL_FRONTEND} id="link-to-signin-page"> Connectez-vous</Link>
                
            </section>
        </div>     
    );
}

export default Signup;

       
       