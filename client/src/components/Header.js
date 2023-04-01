import "../styles/Header.css"
import "../styles/Button.css";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import useLoader from "../hooks/useLoader";
import { ModalContext } from "../contexts/ModalContext";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import LogoutForm from "./LogoutForm";

const Header = (props) => {
  const { user } = useContext(UserContext);
  const [{ getLoader }] = useLoader();
  const { handleModal } = useContext(ModalContext);
  
  const buttons = () => {
    if (props.loading) return getLoader();
    
    if (!user.loggedIn) {
      return (
        <>
          <button className="button" onClick={() => handleModal(<LoginForm />)}>Log In</button>
          <button className="button" onClick={() => handleModal(<SignUpForm />)}>Sign Up</button>
        </>
      );
    }
    
    return (
      <>
      <button className="button" onClick={() => handleModal(<LogoutForm />)}>Log Out</button>
      </>
    );
  }
  
  return (
    <div id="header">
      <p><span>Members</span><span>Only</span></p>
      {buttons()}
    </div>
  );
}

export default Header;