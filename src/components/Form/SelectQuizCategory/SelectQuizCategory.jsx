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
    const category= formik.values.category;
    const enterCategory = formik.handleChange;
    const touchCategoryField = formik.handleBlur;
    const categoryError = getCategoryError(formik);
    return(
        <div className="select is-warning" id="selectCategoriesContainer">
            <select 
                id="selectCategories" 
                name="category"
                value= {category}
                onChange={enterCategory}
                onBlur={touchCategoryField}
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