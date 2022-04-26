import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./FormError.css";

const FormError = ({errorContent}) => {

    return(
        <div className="errorMessageForm">
            <FontAwesomeIcon icon={faInfoCircle} className="errorIconForm" /> 
            <p className="errorForm">{errorContent}</p>
        </div>
    )
};

export default FormError;