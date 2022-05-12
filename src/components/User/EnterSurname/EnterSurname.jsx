import FormError from "../../Common/FormError/FormError";

const getSurnameError = (formik) => {
    let touched = false;
    if(formik.touched && formik.touched.surname) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.surname) {
        return formik.errors.surname;
    }
};

const EnterSurname = ({
    formik
}) => {
    const surnameError = getSurnameError(formik);
    const { handleChange, handleBlur, values } = formik;
    const { surname } = values;
    
    return(
        <div className="field sign-up-field">
        <label htmlFor="nom" className="sr-only">Nom</label>
            <input 
                id="nom"
                name="surname"
                type="text"
                className="input"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value = {surname}
                placeholder="Nom"
            />
            {surnameError ? 
            <FormError errorContent={surnameError} />
            : null}
        </div>
    )
};

export default EnterSurname;