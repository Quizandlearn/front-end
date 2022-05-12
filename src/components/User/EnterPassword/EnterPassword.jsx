import FormError from "../../Common/FormError/FormError";
import { useState } from 'react';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getPasswordError = (formik) => {
    let touched = false;
    if(formik.touched && formik.touched.password) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.password) {
        return formik.errors.password;
    }
};

const EnterPassword = ({
    formik
}) => {
    const passwordError = getPasswordError(formik);
    const { handleChange, handleBlur, values } = formik;
    const { password } = values;
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    
    return(
        <div className="field login-form password-container">
            <label htmlFor="password" className="sr-only">Password</label>
                <input 
                    id="password"
                    name="password"
                    autoComplete="on"
                    type={passwordShown ? "text" : "password"}
                    className="input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value = {password}
                    placeholder="password"
                />
                <button id="passwordEye" onClick={togglePasswordVisiblity} >
                        <FontAwesomeIcon icon={faEye} className="eye"/>
                </button>
            {passwordError ? 
            <FormError errorContent={passwordError} />
            : null}
        </div>
    )
};

export default EnterPassword;