const Button = ({value}) => {
    return(
        <div className="login-submit">
            <input 
              className="button login-submit-button"
              type="submit" 
              value={value}
            />
        </div>
    )
};

export default Button;