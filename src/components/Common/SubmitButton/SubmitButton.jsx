const Button = ({value}) => {
    return(
      <div className="login-submit">
        <button 
          className="button login-submit-button"
          type="submit"
        >
          {value}
        </button>
      </div>
    )
};

export default Button;