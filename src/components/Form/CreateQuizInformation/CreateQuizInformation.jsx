import CreateQuizTitle from "../CreateQuizTitle/CreateQuizTitle";
import CreateQuizDescription from "../CreateQuizDescription/CreateQuizDescription";
import SelectQuizCategory from "../SelectQuizCategory/SelectQuizCategory";

const CreateQuizInformation = ({
    formik
}) => {
;
    return(
        <div className="section-container">
           <CreateQuizTitle formik={formik} />
           <CreateQuizDescription formik={formik} />
           <SelectQuizCategory formik={formik} />
        </div>
    );
};

export default CreateQuizInformation;