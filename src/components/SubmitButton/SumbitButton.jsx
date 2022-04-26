import "./SubmitButton.css";

const SubmitButton = () => {
    return(
        <div className="buttonContainer">
            <button className="button formSubmitButton" type="submit">
                Sauvegarder ce quiz
            </button>
        </div>
    )
};

export default SubmitButton;