import { Link } from "react-router-dom";

const Header = ({ loggedUser }) => {
  return (
    <section>
      <Link to={`/reviews`}>
        <h1>NC Game Reviews!</h1>
      </Link>
      <h3>Welcome back {loggedUser}!</h3>
    </section>
  );
};

export default Header;
