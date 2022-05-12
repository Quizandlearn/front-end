import FormError from "../../Common/FormError/FormError";
import { useState } from 'react';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getConfirmedPasswordError = (formik) => {
    let touched = false;
    if(formik.touched && formik.touched.confirmedPassword) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.confirmedPassword) {
        return formik.errors.confirmedPassword;
    }
};

const EnterConfirmedPassword = ({
    formik
}) => {
    const confirmedPasswordError = getConfirmedPasswordError(formik);
    const { handleChange, handleBlur, values } = formik;
    const { confirmedPassword } = values;
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);

    const toggleConfirmedPasswordVisiblity = () => {
        setConfirmedPasswordShown(!confirmedPasswordShown);
    };
    
    return(
        <div className="field password-container">
            <label htmlFor="password-confirmation" className="sr-only">Confirmation du mot de passe</label>
                <input 
                    id="password-confirmation"
                    name="confirmedPassword"
                    type={confirmedPasswordShown ? "text" : "password"}
                    className="input"
                    autoComplete="on"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value = {confirmedPassword}
                    placeholder="Confirmation mot de passe"
                />
                <button onClick={toggleConfirmedPasswordVisiblity} className="password-eye-sign-up">
                    <FontAwesomeIcon icon={faEye} className="eye-sign-up"/>
                </button>
            {confirmedPasswordError ? 
            <FormError errorContent={confirmedPasswordError} />
            : null}
        </div>
    )
};

export default EnterConfirmedPassword;