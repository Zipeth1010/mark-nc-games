import { Link } from "react-router-dom";

const Header = ({ loggedUser }) => {
  return (
    <section className="HeaderSection">
      <div className="InnerHeaderSection">
        <div className="header_container">
          <Link to={`/reviews`}>
            <h1 className="HeaderText">Mark's Game Reviews!</h1>
          </Link>
          <h5 className="UserWelcome">Welcome back {loggedUser}!</h5>
        </div>
      </div>
    </section>
  );
};

export default Header;
