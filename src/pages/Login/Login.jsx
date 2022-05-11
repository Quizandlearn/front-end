import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoBlue from '../../assets/logoBlue.png';
import { useAuth } from "../../hooks/useAuth";

const SIGNUP_URL_FRONTEND = '/signup';

const Login = () => {
    const { login } = useAuth();
    const [errMsg, setErrMsg] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .required("Champ obligatoire"),
            password: Yup.string()
                .required("Champ obligatoire"),
        }),

        onSubmit: async (values) => {
            login(values, (error) => {
                setErrMsg(error);
            });
        }
    });

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    return(
        <div className="login-container">

            <br/>
            <img src={LogoBlue} id="logo-login" alt=""></img>  
            <h1 id="login-titre"> Se Connecter</h1>

            <form onSubmit={formik.handleSubmit}>

                <div className="field login-form">
                    <label htmlFor="email"  className="sr-only">E-mail</label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            className="input"
                            autoComplete="on" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value = {formik.values.email}
                            maxLength="24"
                            placeholder = "E-mail" 
                        />

                    {formik.touched.email && formik.errors.email ? 

                        <span className="error-message-login">
                            <FontAwesomeIcon icon={faInfoCircle} className="error-icon-login" /> 
                            <p className="error-login">{formik.errors.email}</p>
                        </span> : null}
                </div>

                <div className="field login-form password-container">
                    <label htmlFor="password" className="sr-only">Password</label>
                        <input 
                            id="password"
                            name="password"
                            autoComplete="on"
                            type={passwordShown ? "text" : "password"}
                            className="input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value = {formik.values.password}
                            maxLength="24"
                            placeholder="password"
                        />

                        <button id="passwordEye" onClick={togglePasswordVisiblity} >
                                <FontAwesomeIcon icon={faEye} className="eye"/>
                        </button>

                    {formik.touched.password && formik.errors.password ? 

                        <span className="error-message-login">
                            <FontAwesomeIcon icon={faInfoCircle} className="error-icon-login" /> 
                            <p className="error-login">{formik.errors.password}</p>
                        </span> : null}
                </div>

                {errMsg && 
                    <span className="error-message-login">
                        <FontAwesomeIcon icon={faInfoCircle} className="error-icon-login" />  
                        <p id="accounterror-login">{errMsg}</p>
                    </span>}
                
                <div className="login-submit">
                    <input 
                        className="button login-submit-button"
                        type="submit" value="Log In"/>
                </div>

            </form>

            <br/>
            <p id="newcomer-question" >Nouveau sur la plateforme ? </p> 
            <Link to={SIGNUP_URL_FRONTEND} id="link-to-other-page">Inscrivez-vous</Link>
        </div>
    );

}

export default Login;