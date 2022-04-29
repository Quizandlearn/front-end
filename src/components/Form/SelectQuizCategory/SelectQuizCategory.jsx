import FormError from "../FormError/FormError";

const getCategoryError=(formik) => {
    let touched = false;
    if(formik.touched && formik.touched.category) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.category) {
        return formik.errors.category;
    }
};

const SelectQuizCategory = ({
    formik
}) => {
    const { handleChange, handleBlur, values } = formik;
    const { category } = values;
    const categoryError = getCategoryError(formik);
    return(
        <div className="select is-warning" id="select-categories-container">
            <select 
                id="select-categories" 
                name="category"
                value= {category}
                onChange={handleChange}
                onBlur={handleBlur}
            >
            <option value="" disabled>Thématique</option>
            <option value="tech">Tech</option>
            <option value="feminisme">Feminisme</option>
            <option value="ecologie">Ecologie</option>
        </select>
        {categoryError ? 
            <FormError errorContent={categoryError} />
            : null}
    </div>
    );
};

export default SelectQuizCategory;