import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to={`/reviews`}>
      <h1>NC Game Reviews!</h1>
    </Link>
  );
};

export default Header;
