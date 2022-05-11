import FormError from "../../Quiz/FormError/FormError";

const getEmailError = (formik) => {
    let touched = false;
    if(formik.touched && formik.touched.email) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.email) {
        return formik.errors.email;
    }
};

const EnterEmail = ({
    formik
}) => {
    const emailError = getEmailError(formik);
    const { handleChange, handleBlur, values } = formik;
    const { email } = values;
    
    return(
        <div className="field login-form">
            <label htmlFor="email"  className="sr-only">E-mail</label>
                <input 
                    id="email"
                    name="email"
                    type="email"
                    className="input"
                    autoComplete="on" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value = {email}
                    placeholder = "E-mail"
                />
            {emailError ? 
            <FormError errorContent={emailError} />
            : null}
        </div>
    )
};

export default EnterEmail;