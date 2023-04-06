import "../styles/Form.css";
import "../styles/Button.css";
import axios from "axios";
import { useContext, useState } from "react";
import ServerContext from "../contexts/ServerContext";
import UserContext from "../contexts/UserContext";

const MembershipForm = () => {
  const SERVER = useContext(ServerContext);
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState();
  const [formError, setFormError] = useState();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${SERVER}/users/membership`, formData, { withCredentials: true, headers: { ContentType: "multipart/form-data"}})
      .then(() => {
        setUser({ ...user, member: true });
        document.querySelector('#modal-root .btn-close').click();
      })
      .catch(err => setFormError(err.response?.data));
  }
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="code">Code</label>
        <input type="text" name="code" placeholder="Membership Code" onChange={handleChange} required />
      </div>
      
      <button type="submit" className="button button-wide">Submit</button>
      {formError ? <p className="form-text-error">{formError.msg}</p> : <></>}
    </form>
  );
}

export default MembershipForm;