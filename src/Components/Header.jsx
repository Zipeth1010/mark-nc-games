import { Link } from "react-router-dom";

const Header = ({ loggedUser }) => {
  return (
    <section className="HeaderSection">
      <Link to={`/reviews`}>
        <h1 className="HeaderText">NC Game Reviews!</h1>
      </Link>
      <h5 className="UserWelcome">Welcome back {loggedUser}!</h5>
    </section>
  );
};

export default Header;
