import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const FormError = ({errorContent}) => {

    return(
        <div className="error-message-form">
            <FontAwesomeIcon icon={faInfoCircle} className="error-icon-form" /> 
            <p className="error-form">{errorContent}</p>
        </div>
    )
};

export default FormError;