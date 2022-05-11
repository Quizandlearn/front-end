import {useLocation, Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({onlyPublic}) => {
    const location = useLocation();
    const {user} = useAuth();

	const isValidToken = (token) => {
		token = jwt_decode(token);
		const now = Math.floor(Date.now() / 1000);

		if(token){
			if (token.exp > now) {
				return true;
			}
		}
		return false;
	};

	const userIsLogged = () => {
		if(user){
			if(isValidToken(user.token)){
				return true;
			}
		}
		return false;
	};

	if (onlyPublic) {
		if(!userIsLogged()) {
			return <Outlet/>;
		}
		return <Navigate to="/quizzes" state={{ from: location }} replace />;
	}

    return (
            (userIsLogged())
                ? <Outlet/>
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;