import CreateTitle from "../CreateTitle/CreateTitle";
import CreateDescription from "../CreateDescription/CreateDescription";
import SelectCategory from "../SelectCategory/SelectCategory";

const CreateQuizInformation = ({
    formik
}) => {
;
    return(
        <div className="section-container">
           <CreateTitle formik={formik} />
           <CreateDescription formik={formik} />
           <SelectCategory formik={formik} />
        </div>
    );
};

export default CreateQuizInformation;