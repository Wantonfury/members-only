import "../styles/Footer.css"
import IconGithub from "../assets/images/github.png"

const Footer = () => {
  return (
    <div id="footer">
      <p>Made by Wantonfury</p>
      <a href="https://github.com/Wantonfury/members-only" target="_blank" rel="noopener noreferrer">
        <img src={IconGithub} alt="Link to GitHub" />
      </a>
    </div>
  );
}

export default Footer;