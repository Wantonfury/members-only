import "../styles/Header.css"
import "../styles/Button.css";

const Header = (props) => {
  const openModal = (modal) => {
    document.querySelector(`#${modal}`).style.display = 'block';
  }
  
  return (
    <div id="header">
      <p><span>Members</span><span>Only</span></p>
      <button className="button" onClick={() => openModal('login')}>Log In</button>
      <button className="button" onClick={() => openModal('signup')}>Sign In</button>
    </div>
  );
}

export default Header;