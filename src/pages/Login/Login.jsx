import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoBlue from '../../assets/logoBlue.png';
import EnterEmail from "../../components/User/EnterEmail/EnterEmail";
import EnterPassword from "../../components/User/EnterPassword/EnterPassword";
import { useAuth } from "../../hooks/useAuth";

const SIGNUP_URL_FRONTEND = '/signup';

const Login = () => {
    const { login } = useAuth();
    const [errMsg, setErrMsg] = useState('');

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

    return(
        <div className="login-container">
            <br/>
            <img src={LogoBlue} id="logo-login" alt=""></img>  
                <h1 id="login-titre"> Se Connecter</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <EnterEmail formik={formik} />
                        <EnterPassword formik={formik} />
                        <div className="login-submit">
                            <input 
                                className="button login-submit-button"
                                type="submit" value="Log In"
                            />
                        </div>
                    </form>
                    <br/>
                    <p id="newcomer-question" >Nouveau sur la plateforme ? </p> 
                    <Link to={SIGNUP_URL_FRONTEND} id="link-to-other-page">Inscrivez-vous</Link>
        </div>
    );

}

export default Login;