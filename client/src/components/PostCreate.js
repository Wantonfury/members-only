import "../styles/Form.css";
import "../styles/Button.css";
import UserContext from "../contexts/UserContext";
import ServerContext from "../contexts/ServerContext";
import { useContext, useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const SERVER = useContext(ServerContext);
  const { user, setUser } = useContext(UserContext);
  const [postData, setPostData] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user.loggedIn) return;
    
    axios.post(`${SERVER}/posts/`, postData, { withCredentials: true, headers: { ContentType: "multipart/form-data" } })
    .catch(err => console.log(err))
    .then(() => {
      setUser({ ...user, postUpdate: true });
      document.querySelector('#modal-root .btn-close').click();
    });
  }
  
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type='text' name="title" placeholder="Title" pattern="[A-Za-z0-9 ]{3,20}" title="Title must be between 3 and 20 characters." onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label htmlFor="msg">Message</label>
        <textarea name="msg" placeholder="Message" rows="5" pattern="[A-Za-z0-9]{3,100}" title="Title must be between 3 and 100 characters." onChange={handleChange} required />
      </div>
      
      <button type="submit" className="button button-wide">Create</button>
    </form>
  );
}

export default PostCreate;