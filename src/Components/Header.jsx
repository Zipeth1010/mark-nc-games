import { Link } from "react-router-dom";

const Header = ({ loggedUser, setLoggedUser }) => {
  const logout = (e) => {
    e.preventDefault();
    setLoggedUser("");
    localStorage.setItem("user", "");
  };

  return (
    <section className=" fixed top-0 w-screen bg-orange">
      <div className=" flex">
        <Link to={`/reviews`}>
          <img src={require("../Assets/Boardit.png")} className=" h-24 pt-3" />
        </Link>
        <div className="fixed right-0 flex-row space-x-8 pr-8 pt-5 text-white">
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
