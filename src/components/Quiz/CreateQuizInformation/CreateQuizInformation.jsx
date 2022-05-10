import CreateTitle from "../CreateTitle/CreateTitle";
import CreateDescription from "../CreateDescription/CreateDescription";
import SelectCategory from "../SelectCategory/SelectCategory";
import PropTypes from "prop-types";

const CreateQuizInformation = ({
    formik
}) => {
    return(
        <div className="section-container">
           <CreateTitle formik={formik} />
           <CreateDescription formik={formik} />
           <SelectCategory formik={formik} />
        </div>
    );
};

CreateQuizInformation.propTypes = {
    formik: PropTypes.object
}

export default CreateQuizInformation;