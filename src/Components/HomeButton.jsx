import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <Link to="/reviews">
      <button className=" fixed bottom-5 right-5 outline outline-black bg-white text-orange hover:bg-orange hover:text-white my-2 px-4 rounded">
        Home
      </button>
    </Link>
  );
};

export default HomeButton;
