import "../styles/PostList.css"
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import ServerContext from "../contexts/ServerContext";
import axios from "axios";
import useLoader from "../hooks/useLoader";
import IconDelete from "../assets/images/btn-delete.svg"

const PostList = () => {
  const { user, setUser } = useContext(UserContext);
  const SERVER = useContext(ServerContext);
  const [{ getLoader }] = useLoader();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user.postUpdate) setUser({ ...user, postUpdate: false });
    
    axios.get(`${SERVER}/posts`, { withCredentials: true })
    .then(res => res.data)
    .then(posts => {
      setPosts(posts);
      setLoading(false);
    })
    .catch(err => console.log(err))
  }, [user, setUser, SERVER]);
  
  const checkUser = (post) => {
    return ((user.loggedIn && user.member) || user.username === post.user.username);
  }
  
  const deletePost = (id) => {
    axios.delete(`${SERVER}/posts/${id}`, { withCredentials: true })
      .then(() => setUser({ ...user, postUpdate: true }))
      .catch(err => console.log(err));
  }
  
  return (
    <ul className="post-list">
      {loading ? <div className="post-loader">{getLoader()}</div> : posts.map((post, index) => {
        return <li className="post" key={index}>
          {user.admin ? <button className="post-btn-delete button button-small" onClick={() => deletePost(post._id)}><img src={IconDelete} alt="Delete Post" /></button> : <></>}
          <h4 className="post-title">{post.title}</h4>
          <p className="post-msg">{post.msg}</p>
          <div className="post-data">
            <span>Posted by <span className="post-user">{checkUser(post) ? post.user.username : 'Anonymous'}</span></span>
            <span className="post-date">{checkUser(post) ? new Date(post.date).toLocaleString() : 'N/A'}</span>
          </div>
        </li>
      })}
      
    </ul>
  );
}

export default PostList;