import axios from '../config/axios';
import { api } from '../config/api';
import { errorDisplayed } from '../config/error';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./useAuth";

const LOGIN_URL_EXPLORE = '/explore';

export const useCreateQuiz = () => {
    const navigate = useNavigate();
    const {user} = useAuth();

    const createQuiz = async (values, onError) => {

        try {
                const response = await axios.post(api.quizzes, 
                                JSON.stringify({id_user_owner: user.userId,
                                                title : values.title,
                                                description: values.description,
                                                categories: values.categories,
                                                /* questions: values.questions */}),
                                {
                                        headers: {'Authorization' : `Bearer ${user.token}`, 
                                                    'Content-Type': 'application/json'},
                                    withCredentials: true
                                });
                                     
               console.log(response.data);
               console.log(JSON.stringify(response));
               navigate(LOGIN_URL_EXPLORE );
               
       } catch (error) {
           if(typeof onError === "function") {
                if (!error.response) {
                    onError(errorDisplayed.server);

                /*Changer cette erreur */
                } else if (error.response.status === 400) {
                    onError(errorDisplayed.existingAccount);

                }
            }
        }
    };

    return {
        createQuiz
    }
}