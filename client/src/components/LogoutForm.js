import '../styles/Button.css';
import '../styles/Modal.css';
import '../styles/Form.css';
import axios from "axios";
import ServerContext from '../contexts/ServerContext';
import UserContext from '../contexts/UserContext';
import { useContext } from "react";

const LogoutForm = () => {
  const SERVER = useContext(ServerContext);
  const { user, setUser } = useContext(UserContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${SERVER}/users/logout`, null, { withCredentials: true })
      .then(() => setUser({ ...user, loggedIn: false }))
      .catch(err => console.log(err))
      .finally(() => cancelLogout());
  }
  
  const cancelLogout = () => {
    document.querySelector('#modal-root .btn-close').click();
  }
  
  return (
    <form className="form" onSubmit={handleSubmit} >
      <p>Are you sure you want to log out?</p>
      <div className="form-group group-row">
        <button type="button" className="button" onClick={cancelLogout} >No</button>
        <button type="submit" className="button">Yes</button>
      </div>
    </form>
  );
}

export default LogoutForm;