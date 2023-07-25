import { Link } from "react-router-dom";

const Header = ({ loggedUser, setLoggedUser }) => {
  const logout = (e) => {
    e.preventDefault();
    setLoggedUser("");
    localStorage.setItem("user", "");
  };

  return (
    <section className="HeaderSection">
      <div className="InnerHeaderSection">
        <div className="header_container">
          <Link to={`/reviews`}>
            <h1 className="HeaderText">Mark's Game Reviews!</h1>
          </Link>
          <h5 className="UserWelcome">Welcome back {loggedUser}!</h5>
          <a href="/">
            <button onClick={logout}>Log out!</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
