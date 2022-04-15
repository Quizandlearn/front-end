import React, {useState} from 'react';
import LogoBlue from '../../assets/logoBlue.png';
import profile from '../../assets/profile.png';
import "./Navigation.css";
import { useAuth } from "../../hooks/useAuth";
import { Link } from 'react-router-dom';

const Navigation = () => {

    const {logout, user} = useAuth();

    const [showLinks, setShowLinks] = useState(false);

    const handleShowLinks = () => {
        setShowLinks(!showLinks);
    }

    const handleClickLink = () => {
        setShowLinks(false);
    }
    if (user) { return (
            <div className={`navigation ${showLinks? "show-navigation" : ""}`}>
                <div className="upperPartNavigationContainer">
                    <img src={LogoBlue} className="logoNavigation" alt=""/>
                    {/*Search bar Bulma*/}  
                    <div className="searchBar">
                        <input className="input" 
                            type="text" 
                            placeholder="Search"/>
                    </div>
                    <div className="logoutAndProfile">
                        <button className="button" onClick={logout}>Log Out </button>
                        <div className="profile">
                            <figure className="image is-64x64">
                                <img className="is-rounded" src={profile} alt="Profile" />
                            </figure>
                            <h6>Firstname</h6>
                        </div>
                    </div>
                </div>
                <div className={`menu ${showLinks? "show-menu" : ""}`}>
                    <div className='menu-items'>
                        <Link className="menu-link" to="/quizzes" onClick={handleClickLink}>
                            Explore
                        </Link>
                        <Link className="menu-link" to="/categories" onClick={handleClickLink}>
                            Categories
                        </Link>
                        <Link className="menu-link" to="" onClick={handleClickLink} >
                            Create Quiz
                        </Link>
                        {/* A faire */}
                        <Link className="menu-link" to="/myQuizzes" onClick={handleClickLink}>
                            My Quizzes
                        </Link>       
                        <Link className="menu-link" to="/favoriteQuizzes" onClick={handleClickLink} >
                            Favorites Quizzes
                        </Link>  
                        <Link className="menu-link" to="/completedQuizzes" onClick={handleClickLink} >
                            Completed Quizzes
                        </Link> 
                    </div>
                </div>
                <button className='navbar-burger' onClick={handleShowLinks}>
                    <span className="burger-bar"></span>
                </button>
        </div>        
    )} else {return <></>};
}

export default Navigation;