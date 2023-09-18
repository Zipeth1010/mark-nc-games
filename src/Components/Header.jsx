import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ loggedUser, setLoggedUser, userDetails }) => {
  const [displayDetails, setDisplayDetails] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    displayDetails ? setDisplayDetails(false) : setDisplayDetails(true);
  };
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
        <div className=" fixed right-0 space-x-10 pr-8 pt-5 text-white items-center invisible sm:visible">
          <button
            className=" block h-16 w-16 rounded-full overflow-hidden border border-black"
            onClick={handleClick}
          >
            <img
              src={userDetails.avatar_url}
              alt=""
              className=" h-full w-full object-cover"
            />
          </button>
        </div>
        {displayDetails ? (
          <div className=" fixed top-0 right-2 my-28 w-40 bg-white rounded-lg text-black shadow-black shadow-xl z-50 invisible sm:visible">
            <h5 className=" text-lg font-bold py-2 px-4 z-50">
              Welcome back {loggedUser}!
            </h5>
            <a href="/" className=" px-4">
              <button
                className=" bg-red text-white outline outline-black hover:bg-orange hover:text-white my-2 px-4 rounded"
                onClick={logout}
              >
                Log out!
              </button>
            </a>
          </div>
        ) : null}
      </div>
      <section className="fixed top-26 w-screen bg-white z-10">
        <br></br>
      </section>
    </section>
  );
};

export default Header;
