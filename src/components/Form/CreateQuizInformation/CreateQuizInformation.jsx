import FormError from "../FormError/FormError";

/* Créer config pour erreurs*/

const CreateQuizInformation = ({
    formik
}) => {
    return(
        <>
            <label htmlFor="title" className="sr-only">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    className="input"
                    value = {formik.values.title}
                    maxLength="24"
                    placeholder = "Titre questionnaire"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            {formik.touched.title && formik.errors.title ? 
                <FormError errorContent={formik.errors.title} />
            : null}
        
            <textarea
                name="description"
                className="textarea"
                placeholder="Description"
                rows="4"
                type="text"
                value = {formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                >
            </textarea>
            {formik.touched.description && formik.errors.description ? 
                <FormError errorContent={formik.errors.description} />
                : null}
            
            <div className="select is-warning" id="selectCategoriesContainer">
                    <select 
                        id="selectCategories" 
                        name="categories"
                        value= {formik.values.categories}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="" disabled>Thématique</option>
                        <option value="tech">Tech</option>
                        <option value="feminisme">Feminisme</option>
                        <option value="ecologie">Ecologie</option>
                    </select>
                    {formik.touched.categories && formik.errors.categories ? 
                    <FormError errorContent={formik.errors.categories} />
                    : null}
            </div>
        </>
    );
};

export default CreateQuizInformation;