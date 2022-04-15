import LogoBlue from '../../assets/logoBlue.png';
import profile from '../../assets/profile.png';
import "./Header.css";
import { useAuth } from "../../hooks/useAuth";
import { Link } from 'react-router-dom';

const Header = () => {

    const {logout, user} = useAuth();
    console.log('user',user);
    return (
        <div className='header'>
            <nav>
                <section className="upperPartHeaderContainer">
                    <img src={LogoBlue} className="logoHeader" alt=""/>
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
                </section>
            </nav>
            <div className='menuContainer'>
                <Link className="navbar-item" to="/quizzes" >
                    Explore
                </Link>
                <Link className="navbar-item" to="/categories" >
                    Categories
                </Link>
                <Link className="navbar-item" to="" >
                    Create Quiz
                </Link>
                {/* A faire */}
                <Link className="navbar-item" to="/myQuizzes" >
                    My Quizzes
                </Link>       
                <Link className="navbar-item" to="/favoriteQuizzes" >
                    Favorites Quizzes
                </Link>  
                <Link className="navbar-item" to="/completedQuizzes" >
                    Completed Quizzes
                </Link> 
            </div>
        </div>
    );
}

export default Header;