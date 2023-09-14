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
          <img
            src={require("../Assets/Boardit.png")}
            className=" h-24 pt-3 z-40"
          />
        </Link>
        <div className="fixed right-0 space-x-10 pr-8 pt-5 text-white items-center">
          <h5 className=" text-xl font-bold">Welcome back {loggedUser}!</h5>
          <a href="/">
            <button
              className=" bg-red text-white outline outline-black hover:bg-orange hover:text-white my-2 px-4 rounded"
              onClick={logout}
            >
              Log out!
            </button>
          </a>
        </div>
      </div>
      <section className="fixed top-26 w-screen bg-white">
        <br></br>
      </section>
    </section>
  );
};

export default Header;
