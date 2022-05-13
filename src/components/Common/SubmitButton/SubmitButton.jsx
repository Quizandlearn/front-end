const Button = ({value}) => {
    return(
        <button 
          className="button login-submit-button"
          type="submit"
        >
          {value}
        </button>
    )
};

export default Button;