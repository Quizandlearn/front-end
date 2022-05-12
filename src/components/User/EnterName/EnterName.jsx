import FormError from "../../Common/FormError/FormError";

const getNameError = (formik) => {
    let touched = false;
    if(formik.touched && formik.touched.name) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.name) {
        return formik.errors.name;
    }
};

const EnterName = ({
    formik
}) => {
    const nameError = getNameError(formik);
    const { handleChange, handleBlur, values } = formik;
    const { name } = values;
    
    return(
        <div className="field sign-up-field">
            <label htmlFor="name" className="sr-only">Prénom*</label>
                <input 
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="on"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value = {name}
                    className="input"
                    placeholder = "Prénom"  
                />
            {nameError ? 
            <FormError errorContent={nameError} />
            : null}
        </div>
    )
};

export default EnterName;