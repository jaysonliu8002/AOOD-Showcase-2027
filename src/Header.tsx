import eagle from "./assets/CHS-Eagle.svg";

const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={eagle} alt="CHS Eagle" />
      <h1>AOOD Project Showcase</h1>
    </header>
  );
};

export default Header;
