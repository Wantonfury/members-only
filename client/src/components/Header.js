import "../styles/Header.css"

const Header = (props) => {
  return (
    <div id="header">
      <p><span>Members</span><span>Only</span></p>
      <button>Log In</button>
      <button>Sign Up</button>
    </div>
  );
}

export default Header;