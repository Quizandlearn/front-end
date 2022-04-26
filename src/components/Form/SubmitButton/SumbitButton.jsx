import "./SubmitButton.css";

const SubmitButton = () => {
    return(
        <div className="formSubmitButtonContainer">
            <button className="button formSubmitButton" type="submit">
                Sauvegarder ce quiz
            </button>
        </div>
    )
};

export default SubmitButton;