import "./MyProfile.css";
import profile from "./profile.png";
import { useAuth } from "../../hooks/useAuth";

function EditButtons() {
  return <button className="editButton">Edit</button>;
}

function MyProfileAboutYou() {
  return (
    <div className="personalInformationContainer">
      <label htmlFor="title" className="titleInsideContainer">
        About You
      </label>
      <div class="field">
        <label class="label">Name</label>
        <p>My Name</p>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <p>My Email</p>
      </div>

      <div class="field">
        <label class="label">Contact</label>
        <p>My Contact</p>
      </div>
      <EditButtons />
    </div>
  );
}

function MyProfileImage() {
  const { logout } = useAuth();
  return (
    <div className="photoProfileContainer">
      <figure className="image is-128x128">
        <img className="is-rounded" src={profile} alt="Profile" />
      </figure>
      <label htmlFor="title" className="titleInsideContainer">
        First name
      </label>
      <button className="editButton" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}

function MyProfileInformation() {
  return (
    <div className="mainsection-container">
      <MyProfileImage />
      <MyProfileAboutYou />
    </div>
  );
}

function MyProfileTitle() {
  return (
    <div classname="titleContainer">
      <section id="titleContainer">
        <h1 id="profileTitle">My profile</h1>
      </section>
    </div>
  );
}

function MyProfile() {
  return (
    <div className="profilePageContainer">
      <MyProfileTitle />
      <MyProfileInformation />
    </div>
  );
}

export default MyProfile;
