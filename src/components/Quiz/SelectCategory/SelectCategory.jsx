import FormError from "../../Common/FormError/FormError";
import PropTypes from "prop-types";
import { useCategoriesQuiz } from "../../../hooks/useCategories";

const getCategoryError=(formik) => {
    let touched = false;
    if(formik.touched && formik.touched.category) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.category) {
        return formik.errors.category;
    }
};

const SelectCategory = ({
    formik
}) => {
    const [loading, data] = useCategoriesQuiz();
    const { handleChange, handleBlur, values } = formik;
    const { category } = values;
    const categoryError = getCategoryError(formik);

    return(
        <>
            {loading && <div>Loading</div>}
            {console.log(data)}

            {!loading && <div className="select is-warning" id="select-categories-container">
                <select
                    id="select-categories"
                    name="category"
                    value= {category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                <option value="" disabled>
                    Thématique
                </option>
                {data.categories.map((category, index)=>{
                    return(
                        <option key={index} value={category}>
                            {category}
                        </option>
                    );
                })}
            </select>
            {categoryError ? 
                <FormError errorContent={categoryError} />
                : null}
            </div>}
        </>
    );
};

SelectCategory.propTypes = {
    formik: PropTypes.object
}

export default SelectCategory;